import { Injectable } from '@angular/core';
import { DataState } from 'src/app/store/data/models/data.state';
import { Store } from '@ngrx/store';
import { PokemonService } from '../pokemon/pokemon.service';
import { IPokemons } from 'src/app/models/internals/pokemons.model';
import { BehaviorSubject, Observable, of } from "rxjs";
import { setPokemonAction } from "src/app/store/data/data.actions";
import { catchError, finalize, tap } from 'rxjs/operators';
import { selectPokemons } from 'src/app/store/data/data.selectors';

@Injectable()
export class PokemonManager {
  private loadingTest = new BehaviorSubject<boolean>(false)
  
  public pokemons$ = new Observable<IPokemons>()

  public get loading$() {
    return this.loadingTest.asObservable()
  }

  private cachedPokemons!: IPokemons|undefined;

  constructor(
    private store: Store<DataState>, 
    private pokemonService: PokemonService
  ) {
    this.store.select(selectPokemons).subscribe((storedPokemons) => {
      this.cachedPokemons = storedPokemons;
    })
  }

  public fetchPokemons(page: number): void {
    this.loadingTest.next(true)

    if(this.cachedPokemons?.currentPage === page){
      this.pokemons$ = of(this.cachedPokemons).pipe(
        catchError((error) => {
          throw `POKEMONMANAGER SERVICE ERROR: ${error}`; 
        }),
        finalize(() => {
          this.loadingTest.next(false); // Establecer a false al finalizar la llamada
        })    
      )
    }else {
      console.log("fetched")
      this.pokemons$ = this.pokemonService.getPokemons(page).pipe(
        tap((pokemons: IPokemons) => {
            //save it into storage
            this.store.dispatch(setPokemonAction(
                  pokemons
            ));
        }),
      
        finalize(() => {
          this.loadingTest.next(false); // Establecer a false al finalizar la llamada
        })        
      )
    }
}




  
}
