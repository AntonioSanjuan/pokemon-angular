import { of } from "rxjs"
import { UseDetailedPokemons } from "./useDetailedPokemons.service"
import { mockGetter } from "src/app/utils/tests/commonMocks";

const getDetailedPokemonSpy = jest.fn()

export const UseDetailedPokemonsMock: Partial<UseDetailedPokemons> = {
  getDetailedPokemon: getDetailedPokemonSpy,
  loading$: of(false),
}

export const UseFilterPokemonsMockReset = () => {
  getDetailedPokemonSpy.mockReset()

  mockGetter(UseDetailedPokemonsMock, "loading$", of(false))
}