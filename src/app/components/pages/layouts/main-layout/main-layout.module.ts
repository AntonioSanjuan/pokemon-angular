import { NgModule } from '@angular/core';
import { HeaderComponent } from 'src/app/components/commons/header/header.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';



const declarations: any[] = [HeaderComponent];
@NgModule({
  declarations: [...declarations],
  imports: [
    SharedModule,
  ],
  exports: [...declarations],
})
export class MainLayoutModule {}