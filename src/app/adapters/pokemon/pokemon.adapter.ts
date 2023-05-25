import { Injectable } from '@angular/core';
import { PokemonsDto } from 'src/app/models/dtos/pokemonsDto.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { PokemonDto } from 'src/app/models/dtos/pokemonDto.model';
import { MinifiedPokemonDto } from 'src/app/models/dtos/pokemonMinified.model';
import { IPokemon, Pokemon, IPokemons, Pokemons } from 'src/app/models/internals/pokemons.model';
import { PokemonPaginationDto } from 'src/app/models/dtos/common/pokemonPaginationDto.model';

@Injectable()
export class PokemonAdapter {
  public isError: boolean = false;
  public isLoading: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  public getPokemons(page: number): Observable<IPokemons> {
    this.isLoading = true;
    this.isError = false;

    let rawPokemonsPaginationDto: PokemonPaginationDto<any>;

    return this.pokemonService.getPokemons(page).pipe(
        switchMap((pokemons: PokemonsDto) => {

            rawPokemonsPaginationDto = pokemons;

            const requests = pokemons.results
                .map((minifiedPokemon: MinifiedPokemonDto) => 
                    this.pokemonService.getPokemon(minifiedPokemon.name)
                )
            return forkJoin(requests)
        }),
        map((rawPokemons: PokemonDto[]) => {
            const output = new Pokemons(
                rawPokemonsPaginationDto, 
                page, 
                rawPokemons.map((pokemon): IPokemon => 
                    new Pokemon(pokemon.name, pokemon.sprites.front_default)
                )
            )
            
            return output;
        })
    )
  }
}
