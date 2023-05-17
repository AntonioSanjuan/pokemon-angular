import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// Core modules
const modules = [BrowserModule, BrowserAnimationsModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [],
})
export class CoreModule {}