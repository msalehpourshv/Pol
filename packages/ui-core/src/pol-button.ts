export class PolButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    button.part.add('button');
    button.innerHTML = `<slot></slot>`;
    const style = document.createElement('style');
    style.textContent = `
      button {
        background: var(--pol-color-primary);
        color: white;
        border: none;
        padding: var(--pol-space-sm) var(--pol-space-md);
        border-radius: var(--pol-radius-sm);
        cursor: pointer;
        font-family: var(--pol-font-family-base);
        font-size: var(--pol-font-size-base);
      }
      button:hover {
        background: var(--pol-color-primary-hover);
      }
    `;
    shadow.append(style, button);
  }
}
