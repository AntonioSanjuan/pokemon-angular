import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { PokeApiService } from '../../services/poke-api/poke-api.service';
import { BehaviorSubject, Observable, of } from "rxjs";
import { deleteFilteredPokemonsAction, setFilteredPokemonsAction } from "src/app/store/data/data.actions";
import { finalize, take, tap } from 'rxjs/operators';
import { selectFilteredPokemons } from 'src/app/store/data/data.selectors';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';

@Injectable()
export class UseFilterPokemons {
  private loadingObj = new BehaviorSubject<boolean>(false)
  private filterPokemonsObj = new BehaviorSubject<IFilteredPokemons | undefined>(undefined)

  public get loading$() {
    return this.loadingObj.asObservable()
  }
  public get filteredPokemons$() {
    return this.filterPokemonsObj.asObservable()
  }

  constructor(
    private store: Store<DataState>, 
    private pokemonService: PokeApiService
  ) {
    this.store.select(selectFilteredPokemons)
      .subscribe((storedFilteredPokemons) => {
        this.filterPokemonsObj.next(storedFilteredPokemons)
      })
  }

  private getStoredFilterPokemonsByType(pokemonType: string): IFilteredPokemons | undefined { 
    return this.filterPokemonsObj.value?.byType === pokemonType ? 
      this.filterPokemonsObj.value :
      undefined
  }

  private getStoredFilterPokemonsByName(pokemonName: string): IFilteredPokemons | undefined { 
    return this.filterPokemonsObj.value?.byName === pokemonName ? 
      this.filterPokemonsObj.value :
      undefined
  }

  private fetchFromStoreFilteredPokemons(): Observable<IFilteredPokemons|undefined> {
    return this.filteredPokemons$.pipe(
      take(1),
    )
  }
  
  private fetchFromServiceFilteredPokemonsByType(pokemonType: string): Observable<IFilteredPokemons|undefined> {
    return this.pokemonService.getPokemonsByType(pokemonType).pipe(
      take(1),
    )
  }

  private fetchFromServiceFilteredPokemonsByName(pokemonName: string): Observable<IFilteredPokemons|undefined> {
    return this.pokemonService.getPokemonByName(pokemonName).pipe(
      take(1),
    )
  }

  public deleteFilters(): void {
    this.store.dispatch(deleteFilteredPokemonsAction());
  }

  public getByTypePokemons(pokemonType: string): void {
    this.loadingObj.next(true)

    !!this.getStoredFilterPokemonsByType(pokemonType)
    ? this.fetchFromStoreFilteredPokemons().subscribe() 
    : this.fetchFromServiceFilteredPokemonsByType(pokemonType).pipe(
      tap((filteredPokemons: IFilteredPokemons | undefined) => {
        //save it into storage
        if(filteredPokemons) {
          this.store.dispatch(setFilteredPokemonsAction(
            filteredPokemons
          ));
        }
      }),
    ).pipe(
      finalize(() => {
        this.loadingObj.next(false);
      })  
    ).subscribe()
  }

  public getByNamePokemons(pokemonName: string): void {
    this.loadingObj.next(true)

    !!this.getStoredFilterPokemonsByName(pokemonName)
    ? this.fetchFromStoreFilteredPokemons().subscribe() 
    : this.fetchFromServiceFilteredPokemonsByName(pokemonName).pipe(
      tap((filteredPokemons: IFilteredPokemons | undefined) => {
        //save it into storage
        if(filteredPokemons) {
          this.store.dispatch(setFilteredPokemonsAction(
            filteredPokemons
          ));
        }
      }),
    ).pipe(
      finalize(() => {
        this.loadingObj.next(false);
      })  
    ).subscribe()
  }
}
