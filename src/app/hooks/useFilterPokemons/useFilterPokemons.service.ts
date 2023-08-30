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
  private filteredPokemonsObj = new BehaviorSubject<IFilteredPokemons | undefined>(undefined)

  public get loading$() {
    return this.loadingObj.asObservable()
  }
  public get filteredPokemons$() {
    return this.filteredPokemonsObj.asObservable()
  }

  constructor(
    private store: Store<DataState>, 
    private pokemonService: PokeApiService
  ) {
    this.store.select(selectFilteredPokemons)
      .subscribe((storedFilteredPokemons) => {
        this.filteredPokemonsObj.next(storedFilteredPokemons)
      })
  }

  private getStoredFilteredPokemonsByType(pokemonType: string): IFilteredPokemons | undefined { 
    return this.filteredPokemonsObj.value?.byType === pokemonType ? 
      this.filteredPokemonsObj.value :
      undefined
  }

  private getStoredFilteredPokemonsByNameOrId(pokemonNameOrId: string): IFilteredPokemons | undefined { 
    return this.filteredPokemonsObj.value?.byName === pokemonNameOrId ? 
      this.filteredPokemonsObj.value :
      undefined
  }

  private fetchFromStoreFilteredPokemons(): Observable<IFilteredPokemons|undefined> {
    return this.filteredPokemons$.pipe(
      take(1),
    )
  }
  
  private fetchFromServiceFilteredPokemonsByType(pokemonType: string): Observable<IFilteredPokemons|undefined> {
    return this.pokemonService.getFilteredPokemonsByType(pokemonType).pipe(
      take(1),
    )
  }

  private fetchFromServiceFilteredPokemonsByName(pokemonNameOrId: string): Observable<IFilteredPokemons|undefined> {
    return this.pokemonService.getFilteredPokemonsByName(pokemonNameOrId).pipe(
      take(1),
    )
  }

  public deleteFilters(): void {
    this.store.dispatch(deleteFilteredPokemonsAction());
  }

  public getByTypePokemons(pokemonType: string): void {
    this.loadingObj.next(true)

    const filteredPokemonsObs = !!this.getStoredFilteredPokemonsByType(pokemonType)
    ? this.fetchFromStoreFilteredPokemons()
    : this.fetchFromServiceFilteredPokemonsByType(pokemonType).pipe(
      tap((filteredPokemons: IFilteredPokemons | undefined) => {
        //save it into storage
        if(filteredPokemons) {
          this.store.dispatch(setFilteredPokemonsAction(
            filteredPokemons
          ));
        }
      }),
    )

    filteredPokemonsObs.pipe(
      finalize(() => {
        this.loadingObj.next(false);
      })  
    ).subscribe()
  }

  public getByNameOrIdPokemons(pokemonNameOrId: string): void {
    this.loadingObj.next(true)

    const formattedNameOrId = pokemonNameOrId.replace(/^0+/, '')
    
    const filteredPokemonsObs = !!this.getStoredFilteredPokemonsByNameOrId(formattedNameOrId)
    ? this.fetchFromStoreFilteredPokemons()
    : this.fetchFromServiceFilteredPokemonsByName(formattedNameOrId).pipe(
      tap((filteredPokemons: IFilteredPokemons | undefined) => {
        //save it into storage
        if(filteredPokemons) {
          this.store.dispatch(setFilteredPokemonsAction(
            filteredPokemons
          ));
        }
      }),
    )

    filteredPokemonsObs.pipe(
      finalize(() => {
        this.loadingObj.next(false);
      })
    ).subscribe()
  }
}
