import { of } from "rxjs"
import { IPokemons } from "src/app/models/internals/pokemons.model"
import { UseFilterPokemons } from "./useFilterPokemons.service"

export const UseFilterPokemonsMock: Partial<UseFilterPokemons> = {
  getByTypePokemons: jest.fn(),
  getByNamePokemons: jest.fn(),
  filteredPokemons$: of<IPokemons | undefined>(undefined),
  loading$: of<boolean>(false)
}