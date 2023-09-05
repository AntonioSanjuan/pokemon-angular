import { Component } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { UsePopUp } from 'src/app/hooks/usePopUp/usePopU.service';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-section-details',
  templateUrl: './pokemon-section-details.component.html',
  styleUrls: ['./pokemon-section-details.component.scss'],
})
export class PokemonSectionDetails {
  public pokemonDetails?: IDetailedPokemons | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private usePopUp: UsePopUp
  ) {
        this.pokemonDetails = this.activatedRoute.snapshot.data['pokemonsDeailsResolver'] 
        
        this.router.events.subscribe(() => {
            this.pokemonDetails = this.activatedRoute.snapshot.data['pokemonsDeailsResolver'] 
        })
  }

  public isComparingSwitch() {
    this.usePopUp.openAddPokemonComparison()
  }


}
