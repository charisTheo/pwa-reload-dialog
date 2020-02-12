# <p align="center">&lt;pwa-reload-dialog&gt;</p>

<p align="center">

  [![npm version](https://badge.fury.io/js/pwa-reload-dialog.svg)](//npmjs.com/package/pwa-reload-dialog)
  [![Dependency status](https://david-dm.org/charisTheo/pwa-reload-dialog.svg)](//npmjs.com/package/pwa-reload-dialog?activeTab=dependencies)

</p>

<p align="center">

  <img src="https://github.com/charisTheo/pwa-reload-dialog/blob/master/screenshot.png?raw=true" alt="Example PWA reload dialog"/>

</p>

A minimal dialog message for PWAs that gives the user the option to reload the page on a new version of the web app. If the dialog is dismissed, the Service Worker will remain in the waiting phase and the new version of the website will not be loaded.

## Features
* Custom Web Component
* Accessible
* Works seemlessly with PWAs

----

## 👷‍ Build with 

### 🧱 [Workbox](https://developers.google.com/web/tools/workbox/modules/workbox-window)

<p align="center">
  <img src="https://github.com/charisTheo/pwa-reload-dialog/blob/master/demo.gif?raw=true" alt="A demo of the reload dialog"/>
</p>

## 🚀 Getting started

### Install

- #### npm

1. Inside your project directory run 

       npm install pwa-reload-dialog

2. Import component

   * Inside your app's JavaScript file _(ex: `app.js`)_

         import 'pwa-reload-dialog';

    **OR**

    * Add a `<script>` tag in an HTML file _(ex: `index.html`)_ 

          <script src="./node_modules/pwa-reload-dialog/dist/index.js"></script>

- #### web

      <script type="module" src="https://unpkg.com/pwa-reload-dialog"></script>

### Configure Service Worker

1. Add this listener to your Service Worker file _(ex: `sw.js`)_

        addEventListener('message', event => {
          if (event.data && event.data.type === 'NEW_VERSION') {
              skipWaiting();
          }
        });

### Include component in HTML

1. Include the `<pwa-reload-dialog>` element inside your HTML file _(ex: `index.html`)_

        <pwa-reload-dialog></pwa-reload-dialog>

<br>

> ⚠️ The first time you push your code live the dialog will _not_ be shown, however it will be shown on every new version _after_ that.

> ⚠️ In the above example the component will run on default options that are explained below 👇👇 

## 📚 API Docs

### JavaScript

* `swUrl: String` - Local Service Worker JavaScript file url
  * **Default = `'./sw.js'`**
  
  
* `swScope: String` - The scope by which Service Worker has been registered
  * **Default = `'/'`**
  
  
* `labelText: String` - Dialog main text
  * **Default = `'A new version is available 💎'`**
  
  
* `color: String` - Dialog CSS text color
  * **Default = `'#303f9f'`**
  
  
* `background-color: String` - Dialog CSS background color
  * **Default = `'#ff4081'`**
  
  
* `timeout: String|Number` - Dialog's timeout until it is dismissed (ms)
  * **Default = `null`**
  
<!--   
* `onDismiss: Function` - Callback when dialog has been dismissed after timeout or by clicking on the **X** button.
  * **Default = `null`** -->

#### JavaScript API Example

    const pwaReloadDialog = document.querySelector('pwa-reload-dialog');

    pwaReloadDialog.swUrl = './service-worker.js';
    pwaReloadDialog.swScope = '/';
    pwaReloadDialog.labelText = 'Hello there! New version in town!';
    pwaReloadDialog.timeout = 8000;
    pwaReloadDialog.color = '#d500f9';
    pwaReloadDialog.backgroundColor = '#232323';

  
### HTML

You can either configure the component using JavaScript or even by HTML attributes.

#### HTML API Example
    <pwa-reload-dialog 
      sw-url="./service-worker.js" 
      sw-scope="/"
      timeout="8000"
      label-text="Hello there! New version in town!"
      color="#d500f9"
      background-color="#232323"
    ></pwa-reload-dialog>


## Polyfills

### Install polyfills
      npm install @webcomponents/webcomponentsjs

### Load polyfill
      <!-- load webcomponents bundle, which includes all the necessary polyfills -->
      <script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>

> ℹ [More info on polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#how-to-use)

## Logging

> Logging is enabled only when the component has a `dev` attibute like so:

    <pwa-reload-dialog dev></pwa-reload-dialog>
