import { of } from "rxjs"
import { IPokemons } from "src/app/models/internals/pokemons.model"
import { PokemonsDisplayer } from "./pokemons-displayer"

export const UsePokemonsMock: Partial<PokemonsDisplayer> = {
  fetchPokemons: jest.fn(() => {}),
  pokemons$: of<IPokemons | undefined>(undefined),
  loading$: of<boolean>(false)
}