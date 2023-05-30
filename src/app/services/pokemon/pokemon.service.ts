import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonsDto } from 'src/app/models/dtos/pokemonsDto.model';
import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { PokemonDto } from 'src/app/models/dtos/pokemonDto.model';
import { MinifiedPokemonDto } from 'src/app/models/dtos/pokemonMinified.model';
import { IPokemon, IPokemons } from 'src/app/models/internals/pokemons.model';
import { PokemonPaginationDto } from 'src/app/models/dtos/common/pokemonPaginationDto.model';
import { PokemonAdapter, PokemonsAdapter } from 'src/app/adapters/common/adapter';

@Injectable()
export class PokemonService {
  private limit: number = 20;

  constructor(
    private http: HttpClient,
    private testPokemonAdapt: PokemonAdapter,
    private testPokemonsAdapt: PokemonsAdapter
    ) {}

  private getRawPokemons(page: number): Observable<PokemonsDto> {
    return this.http.get<PokemonsDto>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${page * this.limit}`)
  }

  private getRawPokemon(PokemonName: string): Observable<PokemonDto> {
    return this.http.get<PokemonDto>(`https://pokeapi.co/api/v2/pokemon/${PokemonName.toLowerCase()}`)
  }

  public getPokemons(page: number): Observable<IPokemons> {
    let rawPokemonsPagination: PokemonPaginationDto<unknown>;

    return this.getRawPokemons(page).pipe(
        switchMap((pokemons: PokemonsDto) => {
            rawPokemonsPagination = pokemons;

            const requests = pokemons.results
                .map((minifiedPokemon: MinifiedPokemonDto) => 
                    this.getRawPokemon(minifiedPokemon.name)
                )
            return forkJoin<PokemonDto[]>(requests)
        }),
        map((rawPokemons: PokemonDto[]) => {
            const output = this.testPokemonsAdapt.adapt({
                pagination: rawPokemonsPagination, 
                page, 
                data: rawPokemons.map((pokemon): IPokemon => 
                    this.testPokemonAdapt.adapt(pokemon))
            })
            return output;
        })
    )
  }
}
