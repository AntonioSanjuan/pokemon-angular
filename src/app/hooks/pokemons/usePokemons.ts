import { inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {PokemonService} from '../../services/pokemon/pokemon.service'
import { IPokemon, IPokemons } from "src/app/models/internals/pokemons.model";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function usePokemons() {
    const pokemonService = inject(PokemonService)

    const pokemons$ = new BehaviorSubject<IPokemon[]|undefined>(undefined);
    const loading$ = new BehaviorSubject<boolean>(false);
    

    function fetchPokemons(page: number): void {
        loading$.next(true)

        pokemonService.getPokemons(page)
            .subscribe((pokemons: IPokemons) => {
                pokemons$.next(pokemons.data)
                loading$.next(false)
            })
    }

    function getNext() {}
    function getPrev() {}

    return {
        pokemons$: pokemons$.asObservable().pipe(takeUntilDestroyed()),
        loading$: loading$.asObservable().pipe(takeUntilDestroyed()),
        fetchPokemons,
        getNext,
        getPrev
    }
}