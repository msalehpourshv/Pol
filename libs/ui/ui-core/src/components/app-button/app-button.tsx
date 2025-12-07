import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-button',
})
export class AppButton {
  @Prop() variant: 'primary' | 'secondary' = 'primary';

  render() {
    return (
      <button class={`btn btn-${this.variant}`}>
        <slot />
      </button>
    );
  }
}