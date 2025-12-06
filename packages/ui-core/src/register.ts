import { PolButton } from './pol-button';
import { PolInput } from './pol-input';

export function registerPolComponents() {
  if (!customElements.get('pol-button')) {
    customElements.define('pol-button', PolButton);
  }
  if (!customElements.get('pol-input')) {
    customElements.define('pol-input', PolInput);
  }
}
