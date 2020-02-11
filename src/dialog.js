/**
 * Creates and appends a new dialog element to the page
 * @param {String} message 
 * @param {Object} options
 * @property {Array} options.classList
 * @property {Function} options.dismiss
 * @property {Function} options.eventListener
 * @property {String} options.eventListenerLabel
 * 
 * @returns {HTMLElement} dialog
 */
const create = (message, options) => {
    options = options || {};
    const dialog = document.createElement('div');
    const dialogTextContent = document.createElement('div');
    let dialogDismissButton;
    
    dialog.classList.add('dialog');
    dialog.setAttribute('aria-live', 'polite');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-describedby', 'dialog-text-content');

    dialogTextContent.id = 'dialog-text-content';
    dialogTextContent.classList.add('focus-text');
    dialogTextContent.innerHTML = message;
    dialogTextContent.setAttribute('tabindex', '0');
    
    if (options.classList) {
        dialog.classList.add(options.classList);
    }

    dialogDismissButton = document.createElement('button');
    dialogDismissButton.setAttribute('aria-label', 'Dialog dismiss button');
    dialogDismissButton.classList.add('dialog-dismiss-button', 'focus-outline');
    dialogDismissButton.innerHTML = `<svg tabindex="-1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path class="x-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
    dialogDismissButton.addEventListener('click', options.dismiss);

    if (options.eventListener) {
        dialogTextContent.addEventListener('click', options.eventListener);
        dialogTextContent.setAttribute('aria-label', options.eventListenerLabel);
        dialogTextContent.style.cursor = 'pointer';
        dialogTextContent.setAttribute('role', 'button');
    }

    dialog.innerHTML += '<div style="flex: 1"></div>';
    dialog.appendChild(dialogTextContent);
    dialog.appendChild(dialogDismissButton);

    return dialog;
};

export { create };