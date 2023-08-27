import { of } from "rxjs"
import { UsePokemonTypes } from "./usePokemonTypes.service"
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model"
import { mockGetter } from "src/app/utils/tests/commonMocks"

const prefetchPokemonTypesSpy = jest.fn(() => of(undefined))

export const UsePokemonTypesMock: Partial<UsePokemonTypes> = {
  prefetchPokemonTypes: prefetchPokemonTypesSpy,
  pokemonTypes$: of<IPokemonTypes | undefined>(undefined),
  loading$: of<boolean>(false)
}

export const UsePokemonTypesMockReset = () => {
  prefetchPokemonTypesSpy.mockReset()

  mockGetter(UsePokemonTypesMock, "pokemonTypes$", of(undefined))
  mockGetter(UsePokemonTypesMock, "loading$", of(false))
}