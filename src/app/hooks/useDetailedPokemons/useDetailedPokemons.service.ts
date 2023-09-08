import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { PokeApiService } from '../../services/poke-api/poke-api.service';
import { BehaviorSubject, Observable } from "rxjs";
import { finalize, take, tap, map, switchMap } from 'rxjs/operators';
import { selectDetailedPokemonsByName, selectDetailedPokemons } from 'src/app/store/data/data.selectors';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
import { addDetailedPokemonAction } from 'src/app/store/data/data.actions';

@Injectable()
export class UseDetailedPokemons {
  private loadingObj = new BehaviorSubject<boolean>(false)
  private detailedPokemonsObj = new BehaviorSubject<IDetailedPokemons | undefined>(undefined)

  public get loading$() {
    return this.loadingObj.asObservable()
  }

  constructor(
    private store: Store<DataState>, 
    private pokemonService: PokeApiService
  ) {
    this.store.select(selectDetailedPokemons)
      .subscribe((storedFilteredPokemons) => {
        this.detailedPokemonsObj.next(storedFilteredPokemons)
      })
  }

  private getNonStoredDetailedPokemons(pokemonNames: string[]): string[] { 
    return pokemonNames.filter((pokemonName) => {
      return !this.detailedPokemonsObj.value?.data.find((detailedPokemon) => {
        return detailedPokemon.name === pokemonName
      })
    })
  }

  private fetchFromStoreDetailedPokemons(pokemonNames: string[]): Observable<IDetailedPokemons | undefined> {
    return this.store.select(selectDetailedPokemonsByName(pokemonNames))
  }

  private fetchFromServiceDetailedPokemon(pokemonNames: string[]): Observable<IDetailedPokemons | undefined> {
    return this.pokemonService.getDetailedPokemon(pokemonNames).pipe(
      take(1),
      map((detailedPokemons: IDetailedPokemons) => {
        return detailedPokemons
      })
    )
  }

  public getDetailedPokemon(pokemonNames: string[]): Observable<IDetailedPokemons | undefined> {
    this.loadingObj.next(true)

    const nonStoredDetailedPokemons = this.getNonStoredDetailedPokemons(pokemonNames)
    return (nonStoredDetailedPokemons.length === 0
    ? this.fetchFromStoreDetailedPokemons(pokemonNames)
    : this.fetchFromServiceDetailedPokemon(nonStoredDetailedPokemons).pipe(
      tap((detailedPokemons: IDetailedPokemons  | undefined) => {
        //save it into storage
        if(detailedPokemons) {
          this.store.dispatch(addDetailedPokemonAction(
            detailedPokemons
          ));
        }
      }),
      switchMap(() => {
        return this.fetchFromStoreDetailedPokemons(pokemonNames)
    }),
    )).pipe(
      finalize(() => {
        this.loadingObj.next(false);
      })  
    )
  }
}
