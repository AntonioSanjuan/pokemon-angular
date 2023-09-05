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
import { PokemonFilterComponent } from 'src/app/components/pokemon-filter/pokemon-filter.component';
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
import { GoBackComponent } from 'src/app/components/common/go-back/go-back.component';
import { PokemonDetailsComponent } from 'src/app/components/pokemon-details/pokemon-details.component';
import { PokemonFilterableListComponent } from 'src/app/components/pokemon-filterable-list/pokemon-filterable-list.component';
import { AddPokemonComparisonComponent } from 'src/app/components/common/popUps/add-pokemon-comparison/add-pokemon-comparison.component';
import { UsePopUpModule } from 'src/app/hooks/usePopUp/usePopUp.service.module';
import { PokemonInfoComponent } from 'src/app/components/pokemon-info/pokemon-info.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: PokemonSection, resolve: {pokemonsSectionResolver: pokemonSectionResolver}},
      { path: ':pokemonName', component: PokemonSectionDetails, resolve: {pokemonsDeailsResolver: pokemonSectionDetailsResolver}}
    ],
  },
];
const components = [    
  HomeComponent, 
  PokemonSection, 
  PokemonDetailsComponent, 
  PokemonFilterableListComponent, 
  PokemonSectionDetails, 
  PokemonListComponent, 
  GoBackComponent , 
  PokemonStatsComponent, 
  PokemonFilterComponent, 
  PokemonCardComponent, 
  PokemonTypePillComponent,
  AddPokemonComparisonComponent,
  PokemonInfoComponent
]
const directives = [
  SkeletonDirective, 
  IntersectionObserverDirective, 
  PokemonTypePillDirective, 
  PokemonIdDirective
]

@NgModule({
  declarations: [
    ...components, 
    ...directives
  ],
  imports: [
    SharedModule,
    UsePokemonsModule,
    UseFilteredPokemonsModule,
    UseDetailedPokemonsModule,
    UsePokemonTypesModule,
    UsePopUpModule,
    RouterModule.forChild(routes),
  ],
  exports: [SharedModule, ...directives],
})
export class HomeModule {}