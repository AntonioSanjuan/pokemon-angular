import { NgModule } from '@angular/core';
import { SharedModule } from './../../../app/modules/shared/shared.module';
import { HeaderComponent } from 'src/app/components/header/header.component';



const declarations: any[] = [HeaderComponent];
@NgModule({
  declarations: [...declarations],
  imports: [
    SharedModule,
  ],
  exports: [...declarations],
})
export class MainLayoutModule {}