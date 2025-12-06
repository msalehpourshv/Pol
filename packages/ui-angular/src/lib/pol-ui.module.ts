import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { registerPolComponents } from '@pol/ui-core';

@NgModule({
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PolUiModule {
  constructor() {
    registerPolComponents();
  }

  static forRoot(): ModuleWithProviders<PolUiModule> {
    registerPolComponents();
    return {
      ngModule: PolUiModule,
    };
  }
}
