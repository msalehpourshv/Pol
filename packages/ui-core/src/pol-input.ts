export class PolInput extends HTMLElement {
  private input: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.input = document.createElement('input');
    const style = document.createElement('style');
    style.textContent = `
      input {
        padding: var(--pol-space-sm);
        border-radius: var(--pol-radius-sm);
        border: 1px solid #dfe1e6;
        font-family: var(--pol-font-family-base);
        font-size: var(--pol-font-size-base);
      }
    `;
    this.input.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('input', { detail: (e.target as HTMLInputElement).value }));
    });
    shadow.append(style, this.input);
  }

  connectedCallback() {
    const value = this.getAttribute('value');
    if (value) this.input.value = value;
    const placeholder = this.getAttribute('placeholder');
    if (placeholder) this.input.placeholder = placeholder;
  }
}
