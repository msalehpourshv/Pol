import React from 'react';
import { registerPolComponents } from '@pol/ui-core';

registerPolComponents();

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pol-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      'pol-input': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    }
  }
}

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <pol-button {...props}>{props.children}</pol-button>;
};

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <pol-input {...props} />;
};
