import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { PokeApiService } from '../../services/poke-api/poke-api.service';
import { IPokemons } from 'src/app/models/internals/pokemons.model';
import { BehaviorSubject, Observable, of, delay } from "rxjs";
import { setPokemonAction } from "src/app/store/data/data.actions";
import { catchError, finalize, tap } from 'rxjs/operators';
import { selectPokemons } from 'src/app/store/data/data.selectors';

@Injectable()
export class UsePokemons {
  private loadingObj = new BehaviorSubject<boolean>(false)
  private pokemonsObj = new BehaviorSubject<IPokemons | undefined>(undefined)

  public get loading$() {
    return this.loadingObj.asObservable()
  }
  public get pokemons$() {
    return this.pokemonsObj.asObservable()
  }

  private cachedPokemons!: IPokemons|undefined;

  constructor(
    private store: Store<DataState>, 
    private pokemonService: PokeApiService
  ) {
    this.store.select(selectPokemons)
      .subscribe((storedPokemons) => {
        this.cachedPokemons = storedPokemons;
        
        if(!this.pokemonsObj.value) {
          this.pokemonsObj.next(storedPokemons)
        }
      })
  }

  private fetchFromStore(): Observable<IPokemons|undefined> {
    return of(this.cachedPokemons).pipe(
      tap((pokemons: IPokemons |undefined) => {
        this.pokemonsObj.next(pokemons)
      }),
      catchError((error) => {
        throw `POKEMONMANAGER SERVICE ERROR: ${error}`; 
      }),
      finalize(() => {
        this.loadingObj.next(false);
      })    
    )
  }
  
  private fetchFromService(page: number): Observable<IPokemons|undefined> {

    return this.pokemonService.getPokemons(page).pipe(
      tap((pokemons: IPokemons) => {
        //save it into storage
        this.pokemonsObj.next(pokemons)
        this.store.dispatch(setPokemonAction(
          pokemons
        ));
      }),
      finalize(() => {
        this.loadingObj.next(false);
      })        
    )
  }

  public fetchPokemons(page: number): Observable<IPokemons | undefined> {
    this.loadingObj.next(true)

    return (this.cachedPokemons?.currentPage === page) 
    ? this.fetchFromStore() 
    : this.fetchFromService(page)
  }
}
