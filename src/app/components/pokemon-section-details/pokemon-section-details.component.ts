import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpType, UsePopUp } from 'src/app/hooks/usePopUp/usePopUp.service';
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
    private router: Router,
    private usePopUp: UsePopUp
  ) {
        this.pokemonDetails = this.activatedRoute.snapshot.data['pokemonsDeailsResolver'] 
        
        this.router.events.subscribe(() => {
            this.pokemonDetails = this.activatedRoute.snapshot.data['pokemonsDeailsResolver'] 
        })
  }

  public addPokemonComparison() {
    this.usePopUp.open<IPokemon>(PopUpType.addPokemonComparison).subscribe((pokemon: IPokemon | undefined) => {
      if(pokemon) {
        this.router.navigate([`${this.router.url}-vs-${pokemon.name}`], { replaceUrl: true });
      }
    })
  }

  public removePokemonComparison() {
    const newRoute = this.router.url.split('-vs-')[0]
    this.router.navigate([newRoute], { replaceUrl: true });

  }
}
