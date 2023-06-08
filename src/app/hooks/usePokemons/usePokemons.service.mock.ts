import { Observable, of } from "rxjs"
import { IPokemons } from "src/app/models/internals/pokemons.model"
import { UsePokemons } from "./usePokemons.service"

export const UsePokemonsMock: Partial<UsePokemons> = {
  fetchPokemons: jest.fn(() => {}),
  pokemons$: of<IPokemons | undefined>(undefined),
  loading$: of<boolean>(false)
}