import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonsDto } from 'src/app/models/dtos/pokemonsDto.model';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin, defaultIfEmpty, of } from 'rxjs';
import { PokemonDto } from 'src/app/models/dtos/pokemonDto.model';
import { MinifiedPokemonDto } from 'src/app/models/dtos/pokemonMinified.model';
import { IPokemon, IPokemons, Pokemon } from 'src/app/models/internals/pokemons.model';
import { PokemonPaginationDto } from 'src/app/models/dtos/common/pokemonPaginationDto.model';
import { DetailedPokemonsAdapter, FilteredPokemonsAdapter, PokemonAdapter, PokemonTypesAdapter, PokemonsAdapter } from 'src/app/adapters/poke-api/poke-api.adapter';
import { PokemonTypesDto } from 'src/app/models/dtos/pokemonTypesDto.model';
import { IPokemonTypes } from 'src/app/models/internals/pokemonTypes.model';
import { PokemonByTypeDto, PokemonsByTypeDto } from 'src/app/models/dtos/pokemonsByTypeDto.model';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';

@Injectable()
export class PokeApiService {
  private limit: number = 20;

  constructor(
    private http: HttpClient,
    private pokemonAdapt: PokemonAdapter,
    private pokemonsAdapt: PokemonsAdapter,
    private pokemonTypesAdapt: PokemonTypesAdapter,
    private filteredPokemonsAdapt: FilteredPokemonsAdapter,
    private detailedPokemonsAdapt: DetailedPokemonsAdapter,
    ) {}

  private getRawPokemons(page: number): Observable<PokemonsDto> {
    return this.http.get<PokemonsDto>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${page * this.limit}`)
  }

  private getRawPokemonsByType(type: string): Observable<PokemonsByTypeDto> {
    return this.http.get<PokemonsByTypeDto>(`https://pokeapi.co/api/v2/type/${type}`)
  }

  private getRawPokemonsByName(name: string): Observable<PokemonDto> {
    return this.http.get<PokemonDto>(`https://pokeapi.co/api/v2/pokemon/${name}`)
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

  public getFilteredPokemonsByType(pokemonType: string): Observable<IFilteredPokemons> {
    
    return this.getRawPokemonsByType(pokemonType).pipe(
        switchMap((pokemons: PokemonsByTypeDto) => {
            const requests = pokemons.pokemon
                .map((pokemonByType: PokemonByTypeDto) => 
                    this.getRawPokemon(pokemonByType.pokemon.name)
                )
            return forkJoin<PokemonDto[]>(requests).pipe(
              defaultIfEmpty([])
            )
        }),
        map((rawPokemons: PokemonDto[]) => {
            const output = this.filteredPokemonsAdapt.adapt({
                byName: undefined,
                byType: pokemonType,
                data: rawPokemons.map((pokemon): IPokemon => 
                    this.pokemonAdapt.adapt(pokemon))
            })
            return output;
        })
    )
  }

  public getFilteredPokemonsByName(pokemonName: string): Observable<IFilteredPokemons> {
    
    return this.getRawPokemonsByName(pokemonName).pipe(
        catchError(() => {
          return of<PokemonDto | undefined>(undefined)
        }),
        map((rawPokemon: PokemonDto | undefined) => {
            const output = this.filteredPokemonsAdapt.adapt({
                byName: pokemonName,
                byType: undefined,
                data: rawPokemon ? [this.pokemonAdapt.adapt(rawPokemon)] : []
            })
            return output;
        })
    )
  }

  public getDetailedPokemon(pokemonNames: string[]): Observable<IDetailedPokemons> {
    return forkJoin(
      pokemonNames.map((pokemonName: string) => {
        return this.getRawPokemonsByName(pokemonName).pipe(
          catchError((error) => {
            return of<PokemonDto>()

          }),
        )
      })
    ).pipe(
      map((rawPokemons: PokemonDto[] | undefined) => {
          const output = this.detailedPokemonsAdapt.adapt({
              data: rawPokemons ? rawPokemons.map((rawPokemon) => { return this.pokemonAdapt.adapt(rawPokemon)}) : []
          })
          return output;
      })
  )
  }
}
