import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UsePokemonsModule } from 'src/app/hooks/usePokemons/usePokemons.service.module';
import { PokemonListComponent } from 'src/app/components/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { SkeletonDirective } from 'src/app/directives/skeleton/skeleton.directive';
import { pokemonSectionDetailsResolver, pokemonSectionResolver } from './home.component.resolvers';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { PokemonListFilterComponent } from 'src/app/components/pokemon-list-filter/pokemon-list-filter.component';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';
import { PokemonTypePillComponent } from 'src/app/components/pokemon-type-pill/pokemon-type-pill.component';
import { UseFilteredPokemonsModule } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.module';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { PokemonSection } from 'src/app/components/pokemon-section/pokemon-section.component';
import { PokemonSectionDetails } from 'src/app/components/pokemon-section-details/pokemon-section-details.component';
import { UseDetailedPokemons } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service';
import { UsePokemonTypesModule } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.module';
import { UseDetailedPokemonsModule } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service.module';
import { PokemonIdDirective } from 'src/app/directives/pokemonId/pokemon-id.directive';
import { PokemonStatsComponent } from 'src/app/components/pokemon-stats/pokemon-stats.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: PokemonSection, providers: [UsePokemons, UsePokemonTypes, UseFilterPokemons, UseDetailedPokemons], resolve: {pokemonsSectionResolver: pokemonSectionResolver}},
      { path: ':pokemonName', component: PokemonSectionDetails, providers: [UsePokemons, UsePokemonTypes, UseFilterPokemons, UseDetailedPokemons], resolve: {pokemonsDeailsResolver: pokemonSectionDetailsResolver}}
    ],
  },
];
const directives = [SkeletonDirective, IntersectionObserverDirective, PokemonTypePillDirective, PokemonIdDirective]

@NgModule({
  declarations: [HomeComponent, PokemonSection, PokemonSectionDetails, PokemonListComponent, PokemonStatsComponent, PokemonListFilterComponent, PokemonCardComponent, PokemonTypePillComponent, ...directives],
  imports: [
    SharedModule,
    UsePokemonsModule,
    UseFilteredPokemonsModule,
    UseDetailedPokemonsModule,
    UsePokemonTypesModule,
    RouterModule.forChild(routes),
  ],
  exports: [SharedModule, ...directives],
})
export class HomeModule {}