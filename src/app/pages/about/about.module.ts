import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { DataReducer, featureData } from 'src/app/store/data/data.reducer';
import { UsePokemonsModule } from 'src/app/hooks/usePokemons/usePokemons.service.module';

const routes: Routes = [{ path: '', component: AboutComponent }];

@NgModule({
  declarations: [AboutComponent],
  providers: [],
  imports: [
    SharedModule,
    UsePokemonsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureData, DataReducer),
  ],
  exports: [SharedModule],
})
export class AboutModule {}