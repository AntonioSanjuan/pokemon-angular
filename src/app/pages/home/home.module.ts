import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonAdapterModule } from 'src/app/adapters/pokemon/pokemon.adapter.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  providers: [],
  imports: [
    SharedModule,
    PokemonAdapterModule,
    RouterModule.forChild(routes),
  ],
  exports: [SharedModule],
})
export class HomeModule {}