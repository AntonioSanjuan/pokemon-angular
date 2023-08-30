import { of } from "rxjs"
import { UseFilterPokemons } from "./useFilterPokemons.service"
import { mockGetter } from "src/app/utils/tests/commonMocks";

const getByTypePokemonsSpy = jest.fn()
const getByNamePokemonsSpy = jest.fn()
const deleteFiltersSpy = jest.fn()

export const UseFilterPokemonsMock: Partial<UseFilterPokemons> = {
  getByTypePokemons: getByTypePokemonsSpy,
  getByNameOrIdPokemons: getByNamePokemonsSpy,
  deleteFilters: deleteFiltersSpy,
  filteredPokemons$: of(undefined),
  loading$: of(false),
}

export const UseFilterPokemonsMockReset = () => {
  getByTypePokemonsSpy.mockReset()
  getByNamePokemonsSpy.mockReset()
  deleteFiltersSpy.mockReset()

  mockGetter(UseFilterPokemonsMock, "filteredPokemons$", of(undefined))
  mockGetter(UseFilterPokemonsMock, "loading$", of(false))
}