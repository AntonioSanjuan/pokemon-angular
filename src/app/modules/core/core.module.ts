import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Core modules
const modules = [BrowserModule, BrowserAnimationsModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({}),
    ...modules
  ],
  exports: [...modules],
  providers: [],
})
export class CoreModule {}