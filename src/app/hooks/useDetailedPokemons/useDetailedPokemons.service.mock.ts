import { of } from "rxjs"
import { UseDetailedPokemons } from "./useDetailedPokemons.service"
import { mockGetter } from "src/app/utils/tests/commonMocks";

const getByTypePokemonsSpy = jest.fn()
const getByNamePokemonsSpy = jest.fn()
const deleteFiltersSpy = jest.fn()

export const UseFilterPokemonsMock: Partial<UseDetailedPokemons> = {
  getByTypePokemons: getByTypePokemonsSpy,
  getDetailedPokemon: getByNamePokemonsSpy,
  deleteFilters: deleteFiltersSpy,
  detailedPokemons$: of(undefined),
  loading$: of(false),
}

export const UseFilterPokemonsMockReset = () => {
  getByTypePokemonsSpy.mockReset()
  getByNamePokemonsSpy.mockReset()
  deleteFiltersSpy.mockReset()

  mockGetter(UseFilterPokemonsMock, "filteredPokemons$", of(undefined))
  mockGetter(UseFilterPokemonsMock, "loading$", of(false))
}