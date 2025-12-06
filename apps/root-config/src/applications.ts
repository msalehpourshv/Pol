import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@pol/public-portal',
  app: () => System.import('@pol/public-portal'),
  activeWhen: (location) => !location.pathname.startsWith('/app'),
});

registerApplication({
  name: '@pol/mfe-base-angular',
  app: () => System.import('@pol/mfe-base-angular'),
  activeWhen: (location) => location.pathname.startsWith('/app/base'),
});

registerApplication({
  name: '@pol/mfe-sale-react',
  app: () => System.import('@pol/mfe-sale-react'),
  activeWhen: (location) => location.pathname.startsWith('/app/sale'),
});

start();
