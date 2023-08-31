import { ModuleWithProviders, NgModule } from '@angular/core';
import { HssPopperLibComponent } from './hss-popper-lib.component';
import { PopperContentOptions } from '.';
import { HssPopperController } from './hss-popper-lib.directive';
import { CommonModule } from '@angular/common';

const POPPER_COMPONENTS = [
  HssPopperLibComponent,
  HssPopperController
]

@NgModule({
  declarations: POPPER_COMPONENTS,
  imports: [
    CommonModule
  ],
  exports: POPPER_COMPONENTS
})
export class HssPopperModule { 

  ngDoBootstrap() {
  }

  public static forRoot(popperBaseOptions: PopperContentOptions = {}) {
    return {ngModule: HssPopperModule, providers: [{provide: 'popperDefaults', useValue: popperBaseOptions}]};
  }

}
