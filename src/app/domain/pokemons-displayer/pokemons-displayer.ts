import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, delay } from "rxjs";
import { catchError, finalize, tap } from 'rxjs/operators';
import IPokemonsDisplayer from './port/iPokemon-displayer';
import { IPokemons } from './models/pokemons.model';
import { PokeApiService } from 'src/app/adapters/poke-api/poke-api.service';
import { DataState } from '../store/data/models/data.state';
import { selectPokemons } from '../store/data/data.selectors';
import { setPokemonAction } from '../store/data/data.actions';

@Injectable()
export class PokemonsDisplayer implements IPokemonsDisplayer{
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
    this.loadingObj.next(true)

    this.pokemons$ = (this.cachedPokemons?.currentPage === page) 
    ? this.fetchFromStore() 
    : this.fetchFromService(page)
  }
}
