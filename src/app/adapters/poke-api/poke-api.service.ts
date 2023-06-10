import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { PokemonsDto } from '../models/pokemonsDto.model';
import { IPokemon, IPokemons } from 'src/app/domain/pokemons-displayer/models/pokemons.model';
import { PokemonDto } from '../models/pokemonDto.model';
import { PokemonPaginationDto } from '../models/common/pokemonPaginationDto.model';
import { MinifiedPokemonDto } from '../models/pokemonMinified.model';
import { PokeApiMapper, PokemonsAdapter } from '../mappers/poke-api/poke-api-mapper';

@Injectable()
export class PokeApiService {
  private limit: number = 20;

  constructor(
    private http: HttpClient,
    private pokemonAdapt: PokeApiMapper,
    private pokemonsAdapt: PokemonsAdapter
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
        map((data: any) => {
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
