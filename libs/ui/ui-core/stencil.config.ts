import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

import { reactOutputTarget } from '@stencil/react-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [];

import {
  angularOutputTarget,
  ValueAccessorConfig,
} from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'ui-core',
  tsconfig: './tsconfig.json',
  taskQueue: 'async',
  sourceMap: true,

  extras: {
    experimentalImportInjection: true,
  },
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/hydrate',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      includeGlobalScripts: false,
    },
    reactOutputTarget({
      componentCorePackage: '@pol/ui-core',
      proxiesFile: '../../../../libs/ui-core-react/src/generated/components.ts',
      includeDefineCustomElements: true,
    }),
    angularOutputTarget({
      componentCorePackage: '@pol/ui-core',
      directivesProxyFile:
        '../../../../libs/ui-core-angular/src/generated/directives/proxies.ts',
      directivesArrayFile:
        '../../../../libs/ui-core-angular/src/generated/directives/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
  ],
};
