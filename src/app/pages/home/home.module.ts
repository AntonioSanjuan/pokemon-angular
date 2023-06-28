import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UsePokemonsModule } from 'src/app/hooks/usePokemons/usePokemons.service.module';
import { PokemonListComponent } from 'src/app/components/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { SkeletonDirective } from 'src/app/directives/skeleton/skeleton.directive';
import { homeResolver } from './home.component.resolver';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { PokemonListFilterComponent } from 'src/app/components/pokemon-list-filter/pokemon-list-filter.component';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';

const routes: Routes = [{ path: '', component: HomeComponent, providers: [UsePokemons, UsePokemonTypes], resolve: {pokemonsResolver: homeResolver}}];
const directives = [SkeletonDirective, IntersectionObserverDirective, PokemonTypePillDirective]

@NgModule({
  declarations: [HomeComponent, PokemonListComponent, PokemonListFilterComponent, PokemonCardComponent, ...directives],
  providers: [],
  imports: [
    SharedModule,
    UsePokemonsModule,
    RouterModule.forChild(routes),
  ],
  exports: [SharedModule, ...directives],
})
export class HomeModule {}