import { Injectable } from '@angular/core';
import { PokemonsDto } from 'src/app/models/dtos/pokemonsDto.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { PokemonDto } from 'src/app/models/dtos/pokemonDto.model';
import { MinifiedPokemonDto } from 'src/app/models/dtos/pokemonMinified.model';

@Injectable()
export class PokemonAdapter {
  public isError: boolean = false;
  public isLoading: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  public getPokemons(page: number): Observable<PokemonDto[]> {
    this.isLoading = true;
    this.isError = false;

    return this.pokemonService.getPokemons(page).pipe(
        switchMap((pokemons: PokemonsDto) => {
            const requests = pokemons.results
                .map((minifiedPokemon: MinifiedPokemonDto) => 
                    this.pokemonService.getPokemon(minifiedPokemon.name)
                )
            return forkJoin(requests)
        })
    )
  }
}
