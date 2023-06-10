import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/components/pages/layouts/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../components/pages/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../components/pages/about/about.module').then((m) => m.AboutModule)
      },
    ],
  },
  {
     path: '**', 
     redirectTo: '' ,
  }
];

export const APP_ROUTES = RouterModule.forRoot(routes);