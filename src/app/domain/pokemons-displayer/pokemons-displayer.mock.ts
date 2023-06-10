import { of } from "rxjs"
import { PokemonsDisplayer } from "./pokemons-displayer"
import { IPokemons } from "./models/pokemons.model"

export const PokemonsDisplayerMock: Partial<PokemonsDisplayer> = {
  fetchPokemons: jest.fn(() => {}),
  pokemons$: of<IPokemons | undefined>(undefined),
  loading$: of<boolean>(false)
}