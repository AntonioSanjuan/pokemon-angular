import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonsDisplayerModule } from 'src/app/domain/pokemons-displayer/pokemons-displayer.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  providers: [],
  imports: [
    SharedModule,
    PokemonsDisplayerModule,
    RouterModule.forChild(routes),
  ],
  exports: [SharedModule],
})
export class HomeModule {}