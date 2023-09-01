import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then((m) => m.AboutModule)
      },
    ],
  },
  {
     path: '**', 
     redirectTo: '' ,
  }
];

export const APP_ROUTES = RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" });