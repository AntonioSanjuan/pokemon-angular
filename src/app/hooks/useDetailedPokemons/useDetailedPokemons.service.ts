import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { PokeApiService } from '../../services/poke-api/poke-api.service';
import { BehaviorSubject, Observable, of } from "rxjs";
import { finalize, take, tap, map } from 'rxjs/operators';
import { selectDetailedPokemon, selectDetailedPokemons } from 'src/app/store/data/data.selectors';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';
import { IPokemon } from 'src/app/models/internals/pokemons.model';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
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

  private getStoredDetailedPokemon(pokemonName: string): IPokemon | undefined { 
    return this.detailedPokemonsObj.value?.data.find((detailedPokemon) => {
      return detailedPokemon.name === pokemonName
    })
  }

  private fetchFromStoreDetailedPokemons(pokemonName: string): Observable<IDetailedPokemons | undefined> {
    return this.store.select(selectDetailedPokemon(pokemonName))
  }

  private fetchFromServiceDetailedPokemon(pokemonName: string): Observable<IDetailedPokemons | undefined> {
    return this.pokemonService.getDetailedPokemon(pokemonName).pipe(
      take(1),
      map((detailedPokemons: IDetailedPokemons) => {
        return detailedPokemons
      })
    )
  }

  public getDetailedPokemon(pokemonName: string): Observable<IDetailedPokemons | undefined> {
    this.loadingObj.next(true)

    return (!!this.getStoredDetailedPokemon(pokemonName)
    ? this.fetchFromStoreDetailedPokemons(pokemonName)
    : this.fetchFromServiceDetailedPokemon(pokemonName).pipe(
      tap((detailedPokemons: IDetailedPokemons  | undefined) => {
        //save it into storage
        if(detailedPokemons) {
          this.store.dispatch(addDetailedPokemonAction(
            detailedPokemons
          ));
        }
      }),
    )).pipe(
      finalize(() => {
        this.loadingObj.next(false);
      })  
    )
  }
}
