import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HssPopperModule } from 'projects/hss-popper-lib/src/public-api';
import { Triggers } from 'projects/hss-popper-lib/src/lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HssPopperModule.forRoot({
      trigger: Triggers.CLICK,
      hideOnClickOutside: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
