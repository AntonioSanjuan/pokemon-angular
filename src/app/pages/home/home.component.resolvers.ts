import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { UsePokemons } from "src/app/hooks/usePokemons/usePokemons.service";
import { Observable, catchError, of, forkJoin } from "rxjs";
import { IPokemons } from "src/app/models/internals/pokemons.model";
import { UsePokemonTypes } from "src/app/hooks/usePokemonTypes/usePokemonTypes.service";
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model";
import { UseDetailedPokemons } from "src/app/hooks/useDetailedPokemons/useDetailedPokemons.service";
import { IDetailedPokemons } from "src/app/models/internals/detailedPokemons.model";

interface IHomeResolver {
    pokemons:IPokemons | undefined,
    pokemonTypes: IPokemonTypes | undefined
}

export const pokemonSectionResolver: ResolveFn<any> =
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

export const pokemonSectionDetailsResolver: ResolveFn<any> =
    (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,
        useDetailedPokemons: UseDetailedPokemons = inject(UseDetailedPokemons)
    ): Observable<IDetailedPokemons|undefined> => {
        console.log(route.params['pokemonName'])
        return useDetailedPokemons.getDetailedPokemon(route.params['pokemonName']).pipe(
            catchError((error) => {
                return of(undefined)
            }) 
        )
};