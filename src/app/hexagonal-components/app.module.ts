import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { APP_ROUTES } from './modules/routing/routing.module';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';

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
