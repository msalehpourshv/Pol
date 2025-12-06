import '@pol/design-tokens/dist/tokens.css';
import { registerPolComponents } from '@pol/ui-core';
import singleSpaReact from 'single-spa-react';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';

registerPolComponents();

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  errorBoundary(err) {
    return <div>Error: {err?.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
