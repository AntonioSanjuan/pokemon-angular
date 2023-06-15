import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { PokeApiService } from '../../services/poke-api/poke-api.service';
import { IPokemons } from 'src/app/models/internals/pokemons.model';
import { BehaviorSubject, Observable, of, delay } from "rxjs";
import { setPokemonAction } from "src/app/store/data/data.actions";
import { catchError, finalize, tap } from 'rxjs/operators';
import { selectPokemons } from 'src/app/store/data/data.selectors';
import { Resolve } from '@angular/router';

@Injectable()
export class UsePokemons {
  private loadingObj = new BehaviorSubject<boolean>(false)

  public pokemons$ = new Observable<IPokemons|undefined>()
  public get loading$() {
    return this.loadingObj.asObservable()
  }

  private cachedPokemons!: IPokemons|undefined;

  constructor(
    private store: Store<DataState>, 
    private pokemonService: PokeApiService
  ) {
    this.store.select(selectPokemons)
      .subscribe((storedPokemons) => {
        this.cachedPokemons = storedPokemons;
      })
  }

  private fetchFromStore(): Observable<IPokemons|undefined> {
    return of(this.cachedPokemons).pipe(
      catchError((error) => {
        throw `POKEMONMANAGER SERVICE ERROR: ${error}`; 
      }),
      delay(0),
      finalize(() => {
        this.loadingObj.next(false);
      })    
    )
  }
  
  private fetchFromService(page: number): Observable<IPokemons|undefined> {
    return this.pokemonService.getPokemons(page).pipe(
      tap((pokemons: IPokemons) => {
        //save it into storage
        this.store.dispatch(setPokemonAction(
          pokemons
        ));
      }),
      delay(0),
      finalize(() => {
        this.loadingObj.next(false);
      })        
    )
  }

  public fetchPokemons(page: number): void {
    console.log("called", page)
    this.loadingObj.next(true)

    this.pokemons$ = (this.cachedPokemons?.currentPage === page) 
    ? this.fetchFromStore() 
    : this.fetchFromService(page)
  }
}
