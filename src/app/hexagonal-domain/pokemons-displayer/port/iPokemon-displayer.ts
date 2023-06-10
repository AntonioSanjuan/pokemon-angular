import { Observable } from "rxjs"
import { IPokemons } from "src/app/models/internals/pokemons.model"

export default interface IPokemonsDisplayer {
    fetchPokemons(page: number): void
    loading$: Observable<boolean>
    pokemons$: Observable<IPokemons|undefined>
}