import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DialogComponent, DialogDangerDirective, DialogFooterDirective, DialogHeaderDirective, DialogInfoDirective, DialogSuccessDirective } from './dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, DatepickerComponent, DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
    DialogSuccessDirective,
    DialogDangerDirective,
    DialogInfoDirective,
    DialogHeaderDirective,
    DialogFooterDirective
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
