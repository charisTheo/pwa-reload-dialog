import { Workbox } from 'workbox-window';

import * as Dialog from './dialog.js';
import dialogStyles from '!!css-to-string-loader!css-loader!./dialog.css';

var workbox;

const defaultServiceWorkerFileUrl = './sw.js';
const defaultServiceWorkerScope = '/';
const defaultTimeout = null;
const defaultLabelText = 'A new version is available 💎';
const defaultColor = '#303f9f';  // --pwa-reload-dialog-color
const defaultBackgroundColor = '#ff4081'; // --pwa-reload-dialog-bg-color

class PwaReloadDialog extends HTMLElement {
    constructor() {
        super();
        // Logging only in development
        this.logInfo = this.getAttribute('dev') === "" ? console.info.bind(console) : () => {};
        this.logWarn = this.getAttribute('dev') === "" ? console.warn.bind(console) : () => {};

        this.open = this.open.bind(this);
        this.dismiss = this.dismiss.bind(this);
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});

        this.swUrl = this.getAttribute('sw-url');
        this.swScope = this.getAttribute('sw-scope');
        
        if ('serviceWorker' in navigator) {
            // TODO get SW registration and initialise the Workbox object
            workbox = new Workbox(this.swUrl, { scope: this.swScope });
            this.listenForNewVersion();
            workbox.register();
        }
    }

    get dialog() {return this._dialog || this.shadowRoot.querySelector('.dialog')}
    set dialog(dialog) {this._dialog = dialog}

    get timeout() {return this._timeout || defaultTimeout}
    set timeout(timeout) {this._timeout = timeout}

    get swUrl() {return this._swUrl || defaultServiceWorkerFileUrl}
    set swUrl(dir) {this._swUrl = dir}

    get swScope() {return this._swScope || defaultServiceWorkerScope}
    set swScope(scope) {this._swScope = scope}
    
    get labelText() {return this._labelText || defaultLabelText}
    set labelText(text) {this._labelText = text}

    get color() {return this._color || defaultColor}
    set color(color) {
        this._color = color;
        this.style.setProperty('--pwa-reload-dialog-color', this._color);
    }

    get backgroundColor() {return this._backgroundColor || defaultBackgroundColor}
    set backgroundColor(color) {
        this._backgroundColor = color;
        this.style.setProperty('--pwa-reload-dialog-bg-color', this._backgroundColor);
    }

    // get dismiss() {return this._dismiss || null}
    // set dismiss(func) {this._dismiss = typeof func === 'function' ? func : new Function(func)}

    static get observedAttributes() {
        return ['sw-url', 'sw-scope', 'timeout', 'color', 'background-color', 'on-dismiss'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'sw-url':
                this.swUrl = newValue;
                break;
            
            case 'sw-scope':
                this.swScope = newValue;
                break;
            
            case 'timeout':
                this.timeout = newValue;
                break;
            
            case 'label-text':
                this.labelText = newValue;
                break;
            
            case 'color':
                this.color = newValue;
                break;
            
            case 'background-color':
                this.backgroundColor = newValue;
                break;

            default:
                this.logWarn(`PwaReloadDialog -> Unknown attribute has been added`, name);
                break;
        }
    }

    disconnectedCallback() {
        this.logInfo('PwaReloadDialog -> Web component removed from page.');
        // TODO Is it necessary to remove Service Worker event listeners?
    }

    async listenForNewVersion() {
        this.logInfo("PwaReloadDialog -> Attaching Service Worker event listeners for any new versions.");
        workbox.addEventListener('waiting' , () => {
            this.logWarn(`PwaReloadDialog -> Make sure you include the following in your Service Worker JS file:
                addEventListener('message', event => {
                    if (event.data && event.data.type === 'SKIP_WAITING') {
                        skipWaiting();
                    }
                });
            `);
            this.onNewVersionFound();
        });
    }
    
    onNewVersionFound() {
        this.logInfo("PwaReloadDialog -> New version has been found! Opening snackbar...");
        const dialog = this.createNewDialogElement();
        this.attachDialogToShadowRoot(dialog);

        this.open();
    }

    createNewDialogElement() {
        return Dialog.create(this.labelText, { 
            dismiss: this.dismiss,
            eventListener: this.updateAndReload.bind(this),
            eventListenerLabel: 'Reload page for the new version'
        });
    }
    
    attachDialogToShadowRoot(dialog) {
        this.logInfo("PwaReloadDialog -> Appending dialog content and styles into shadow root.");

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    --pwa-reload-dialog-color: ${this.color};
                    --pwa-reload-dialog-bg-color: ${this.backgroundColor};
                }
                ${dialogStyles}
            </style>
        `;

        this.logInfo("PwaReloadDialog -> Opening dialog...");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(dialog);
    }

    open() {
        const dialog = this.shadowRoot.querySelector('.dialog');
        if (dialog.getAttribute('closed') !== null) {
            dialog.removeAttribute('closed');
        }
        dialog.setAttributeNode(document.createAttribute('open'));
        dialog.setAttribute('aria-hidden', 'false');
        this.logInfo("PwaReloadDialog -> Opened");

        if (this.timeout) {
            setTimeout(() => {
                    this.dismiss();
            }, this.timeout);
        }
    }

    dismiss() {
        const dialog = this.shadowRoot.querySelector('.dialog');
        dialog.removeAttribute('open');
        dialog.setAttribute('aria-hidden', 'true');
        dialog.addEventListener('transitionend', () => {
            this.logInfo("PwaReloadDialog -> Dismissed");
            dialog.setAttributeNode(document.createAttribute('closed'));
        });
    }

    updateAndReload() {
        this.logInfo("PwaReloadDialog -> Updating service worker and reloading the page.");
        workbox.addEventListener('controlling', () => window.location.reload());
        workbox.messageSW({ type: 'SKIP_WAITING'});
        workbox.messageSW({ type: 'NEW_VERSION'});
    }
}

if (!window.customElements.get('pwa-reload-dialog')) {
    window.customElements.define('pwa-reload-dialog', PwaReloadDialog);
}
