import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonServiceModule } from 'src/app/services/poke-api/poke-api.service.module';
import { StoreModule } from '@ngrx/store';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';

const routes: Routes = [{ path: '', component: AboutComponent }];

@NgModule({
  declarations: [AboutComponent],
  providers: [],
  imports: [
    SharedModule,
    PokemonServiceModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureData, DataReducer),
  ],
  exports: [SharedModule],
})
export class AboutModule {}