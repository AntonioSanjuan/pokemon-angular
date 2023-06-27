import { Routes } from "@angular/router";
import { Component } from '@angular/core';

export let RouterMock = {
    navigate: jest.fn(() => {}),
};

@Component({
    selector: 'dummyComponent',
    template: 'dummyComponent',
  })
  class DummyComponent {}

export const routesMock: Routes =   [
    {
        path: 'home',
        component: DummyComponent
    },
    {
        path: 'about',
        component: DummyComponent
    },
  ];
  
