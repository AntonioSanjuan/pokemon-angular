import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UseDetailedPokemons } from 'src/app/hooks/useDetailedPokemons/useDetailedPokemons.service';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
@Component({
  selector: 'app-pokemon-section-details',
  templateUrl: './pokemon-section-details.component.html',
  styleUrls: ['./pokemon-section-details.component.scss'],
})
export class PokemonSectionDetails {
  public pokemonDetails$?: Observable<IDetailedPokemons | undefined>
  constructor(
    private useDetailedPokemons: UseDetailedPokemons, 
    private activatedRoute: ActivatedRoute,
  ) {
        this.pokemonDetails$ = this.useDetailedPokemons.getDetailedPokemon(this.activatedRoute.snapshot.params['pokemonName']) 
  }
}
