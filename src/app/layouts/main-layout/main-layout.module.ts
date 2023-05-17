import { NgModule } from '@angular/core';
import { SharedModule } from './../../../app/modules/shared/shared.module';



const declarations: any[] = [];
@NgModule({
  declarations: [...declarations],
  imports: [
    SharedModule,
  ],
  exports: [...declarations],
})
export class MainLayoutModule {}