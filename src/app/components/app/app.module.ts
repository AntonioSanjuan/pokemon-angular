import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/modules/core/core.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MainLayoutModule } from '../pages/layouts/main-layout/main-layout.module';
import { APP_ROUTES } from 'src/app/modules/routing/routing.module';
import { MainLayoutComponent } from '../pages/layouts/main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent, MainLayoutComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    MainLayoutModule,
    APP_ROUTES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
