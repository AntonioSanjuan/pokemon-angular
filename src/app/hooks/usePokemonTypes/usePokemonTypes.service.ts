import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokeApiService } from '../../services/poke-api/poke-api.service';
import { BehaviorSubject, Observable } from "rxjs";
import { finalize, take, tap } from 'rxjs/operators';
import { DataState } from 'src/app/store/data/models/data.state';
import { setPokemonTypesAction } from 'src/app/store/data/data.actions';
import { selectPokemonTypes } from 'src/app/store/data/data.selectors';
import { IPokemonTypes } from 'src/app/models/internals/pokemonTypes.model';

@Injectable()
export class UsePokemonTypes {
  private loadingObj = new BehaviorSubject<boolean>(false)
  private pokemonTypesObj = new BehaviorSubject<IPokemonTypes | undefined>(undefined)

  public get loading$() {
    return this.loadingObj.asObservable()
  }
  public get pokemonTypes$() {
    return this.pokemonTypesObj.asObservable()
  }

  constructor(
    private store: Store<DataState>, 
    private pokemonService: PokeApiService
  ) {
    this.store.select(selectPokemonTypes)
      .subscribe((storedPokemonTypes) => {
        this.pokemonTypesObj.next(storedPokemonTypes)
      })
  }

  private getStoredPokemonTypes(): IPokemonTypes | undefined { return this.pokemonTypesObj.value}

  private fetchFromStore(): Observable<IPokemonTypes | undefined> {
    return this.pokemonTypes$.pipe(
      take(1),
    )
  }
  
  private fetchFromService(): Observable<IPokemonTypes | undefined> {
    return this.pokemonService.getPokemonTypes().pipe(
      take(1),
    )
  }


  public prefetchPokemonTypes(): Observable<IPokemonTypes | undefined> {
    this.loadingObj.next(true)

    return (!!this.getStoredPokemonTypes()
    ? this.fetchFromStore() 
    : this.fetchFromService().pipe(
      tap((pokemonsTypes: IPokemonTypes | undefined) => {
        //save it into storage
        if(pokemonsTypes) {
          this.store.dispatch(setPokemonTypesAction(
            pokemonsTypes
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
