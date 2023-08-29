import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';

const routes: Routes = [{ path: '', component: AboutComponent }];

@NgModule({
  declarations: [AboutComponent],
  providers: [],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureData, DataReducer),
  ],
  exports: [SharedModule],
})
export class AboutModule {}