import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { PokeApiService } from '../../services/poke-api/poke-api.service';
import { IPokemons } from 'src/app/models/internals/pokemons.model';
import { BehaviorSubject, Observable, of, delay } from "rxjs";
import { addPokemonsAction, setPokemonsAction } from "src/app/store/data/data.actions";
import { finalize, take, tap } from 'rxjs/operators';
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

  constructor(
    private store: Store<DataState>, 
    private pokemonService: PokeApiService
  ) {
    this.store.select(selectPokemons)
      .subscribe((storedPokemons) => {
        this.pokemonsObj.next(storedPokemons)
      })
  }

  private getStoredPokemons(): IPokemons | undefined { return this.pokemonsObj.value}
  private getNextPage(): number { return this.getStoredPokemons()?.currentPage ? this.getStoredPokemons()?.currentPage as number + 1 : 0}

  private fetchFromStore(): Observable<IPokemons|undefined> {
    return this.pokemons$.pipe(
      take(1),
    )
  }
  
  private fetchFromService(page: number): Observable<IPokemons|undefined> {
    return this.pokemonService.getPokemons(page).pipe(
      take(1),
    )
  }

  public fetchNextPokemons(): void {
    this.loadingObj.next(true);

    this.fetchFromService(this.getNextPage()).pipe(
        tap((pokemons: IPokemons|undefined) => {
          //save it into storage
          if(pokemons) {
            this.store.dispatch(addPokemonsAction(
              pokemons
            ));
          }
      }),
      finalize(() => {
        this.loadingObj.next(false);
      })  
    ).subscribe()
  }

  public prefetchPokemons(): Observable<IPokemons | undefined> {
    this.loadingObj.next(true)

    return (!!this.getStoredPokemons()
    ? this.fetchFromStore() 
    : this.fetchFromService(0).pipe(
      tap((pokemons: IPokemons | undefined) => {
        //save it into storage
        if(pokemons) {
          this.store.dispatch(setPokemonsAction(
            pokemons
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
