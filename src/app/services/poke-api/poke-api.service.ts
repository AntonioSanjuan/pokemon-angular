import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonsDto } from 'src/app/models/dtos/pokemonsDto.model';
import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { PokemonDto } from 'src/app/models/dtos/pokemonDto.model';
import { MinifiedPokemonDto } from 'src/app/models/dtos/pokemonMinified.model';
import { IPokemon, IPokemons } from 'src/app/models/internals/pokemons.model';
import { PokemonPaginationDto } from 'src/app/models/dtos/common/pokemonPaginationDto.model';
import { PokeApiAdapter, PokemonTypesAdapter, PokemonsAdapter } from 'src/app/adapters/poke-api/poke-api.adapter';
import { PokemonTypesDto } from 'src/app/models/dtos/pokemonTypesDto.model';
import { IPokemonTypes } from 'src/app/models/internals/pokemonTypes.model';

@Injectable()
export class PokeApiService {
  private limit: number = 20;

  constructor(
    private http: HttpClient,
    private pokemonAdapt: PokeApiAdapter,
    private pokemonsAdapt: PokemonsAdapter,
    private pokemonTypesAdapt: PokemonTypesAdapter,
    ) {}

  private getRawPokemons(page: number): Observable<PokemonsDto> {
    return this.http.get<PokemonsDto>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${page * this.limit}`)
  }

  private getRawPokemon(PokemonName: string): Observable<PokemonDto> {
    return this.http.get<PokemonDto>(`https://pokeapi.co/api/v2/pokemon/${PokemonName.toLowerCase()}`)
  }

  private getRawPokemonTypes(): Observable<PokemonTypesDto> {
    return this.http.get<PokemonTypesDto>(`https://pokeapi.co/api/v2/type`)
  }

  public getPokemonTypes(): Observable<IPokemonTypes> {
    return this.getRawPokemonTypes().pipe(
      map((pokemonTypes: PokemonTypesDto) => {
        return this.pokemonTypesAdapt.adapt(pokemonTypes)
      })
    )
  }

  public getPokemons(page: number): Observable<IPokemons> {
    let rawPokemonsPagination: PokemonPaginationDto<unknown>;

    return this.getRawPokemons(page).pipe(
        map((data: PokemonsDto) => {
          return data
        }),
        switchMap((pokemons: PokemonsDto) => {
            rawPokemonsPagination = pokemons;

            const requests = pokemons.results
                .map((minifiedPokemon: MinifiedPokemonDto) => 
                    this.getRawPokemon(minifiedPokemon.name)
                )
            return forkJoin<PokemonDto[]>(requests)
        }),
        map((rawPokemons: PokemonDto[]) => {
            const output = this.pokemonsAdapt.adapt({
                pagination: rawPokemonsPagination, 
                page, 
                data: rawPokemons.map((pokemon): IPokemon => 
                    this.pokemonAdapt.adapt(pokemon))
            })
            return output;
        })
    )
  }
}
