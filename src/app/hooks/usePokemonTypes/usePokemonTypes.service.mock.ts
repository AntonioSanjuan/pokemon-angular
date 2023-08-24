import { of } from "rxjs"
import { UsePokemonTypes } from "./usePokemonTypes.service"
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model"

export const UsePokemonTypesMock: Partial<UsePokemonTypes> = {
  prefetchPokemonTypes: jest.fn(() => of(undefined)),
  pokemonTypes$: of<IPokemonTypes | undefined>(undefined),
  loading$: of<boolean>(false)
}