import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UsePokemonsModule } from 'src/app/hooks/usePokemons/usePokemons.service.module';
import { PokemonListComponent } from 'src/app/components/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { SkeletonDirective } from 'src/app/directives/skeleton/skeleton.directive';
import { pokemonsResolver } from './home.component.resolver';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

const routes: Routes = [{ path: '', component: HomeComponent, providers: [UsePokemons], resolve: {pokemonsResolver}}];
const directives = [SkeletonDirective]

@NgModule({
  declarations: [HomeComponent, PokemonListComponent, PokemonCardComponent, ...directives],
  providers: [],
  imports: [
    SharedModule,
    UsePokemonsModule,
    RouterModule.forChild(routes),
  ],
  exports: [SharedModule, ...directives],
})
export class HomeModule {}