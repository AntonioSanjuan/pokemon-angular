import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { UsePokemons } from "src/app/hooks/usePokemons/usePokemons.service";
import { Observable, catchError, of } from "rxjs";
import { IPokemons } from "src/app/models/internals/pokemons.model";

export const pokemonsResolver: ResolveFn<any> =
    (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,
        usePokemons: UsePokemons = inject(UsePokemons),
    ): Observable<IPokemons | undefined> => {
        return usePokemons.prefetchPokemons().pipe(
            catchError((error) => {
                return of({} as IPokemons)
                console.log(error)
                throw error;
            })
        );
    };