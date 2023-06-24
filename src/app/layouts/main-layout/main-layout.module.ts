import { NgModule } from '@angular/core';
import { SharedModule } from './../../../app/modules/shared/shared.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { APP_ROUTES } from 'src/app/modules/routing/routing.module';



const declarations: any[] = [HeaderComponent, NavbarComponent];
@NgModule({
  declarations: [...declarations],
  imports: [
    SharedModule,
    APP_ROUTES
  ],
  exports: [...declarations],
})
export class MainLayoutModule {}