import { inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {PokemonService} from '../../services/pokemon/pokemon.service'
import { IPokemons } from "src/app/models/internals/pokemons.model";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function usePokemons() {
    const pokemonService = inject(PokemonService)

    const pokemons$ = new BehaviorSubject<any>(undefined);
    const loading$ = new BehaviorSubject<boolean>(false)

    function fetchPokemons(page: number): void {
        loading$.next(true)

        pokemonService.getPokemons(page).subscribe((pokemons: IPokemons) => {
            pokemons$.next(pokemons)
            loading$.next(false)
        })
    }

    return {
        pokemons$: pokemons$.asObservable().pipe(takeUntilDestroyed()),
        loading$: loading$.asObservable().pipe(takeUntilDestroyed()),
        fetchPokemons
    }
}