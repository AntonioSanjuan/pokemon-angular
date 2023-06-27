import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { UsePokemons } from "src/app/hooks/usePokemons/usePokemons.service";
import { Observable, catchError, of, forkJoin } from "rxjs";
import { IPokemons } from "src/app/models/internals/pokemons.model";
import { UsePokemonTypes } from "src/app/hooks/usePokemonTypes/usePokemonTypes.service";
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model";

interface IHomeResolver {
    pokemons:IPokemons | undefined,
    pokemonTypes: IPokemonTypes | undefined
}

export const homeResolver: ResolveFn<any> =
    (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,
        usePokemons: UsePokemons = inject(UsePokemons),
        usePokemonTypes: UsePokemonTypes = inject(UsePokemonTypes)
    ): Observable<IHomeResolver> => {
        return forkJoin({
            pokemons: usePokemons.prefetchPokemons(),
            pokemonTypes: usePokemonTypes.prefetchPokemonTypes()
        }).pipe(
            catchError((error) => {
                return of({} as IHomeResolver)
                console.log(error)
                throw error;
            })
        )
    };