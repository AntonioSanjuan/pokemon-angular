import { of } from "rxjs"
import { IPokemons } from "src/app/models/internals/pokemons.model"
import { UsePokemons } from "./usePokemons.service"
import { mockGetter } from "src/app/utils/tests/commonMocks"

const fetchNextPokemonsSpy = jest.fn()
const prefetchPokemonsSpy = jest.fn()

export const UsePokemonsMock: Partial<UsePokemons> = {
  fetchNextPokemons: fetchNextPokemonsSpy,
  prefetchPokemons: prefetchPokemonsSpy,
  pokemons$: of<IPokemons | undefined>(undefined),
  loading$: of<boolean>(false)
}

export const UsePokemonsMockReset = () => {
  fetchNextPokemonsSpy.mockReset()
  prefetchPokemonsSpy.mockReset()

  mockGetter(UsePokemonsMock, "pokemons$", of(undefined))
  mockGetter(UsePokemonsMock, "loading$", of(false))
}