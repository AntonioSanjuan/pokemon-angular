import { PokemonPaginationDto } from "./common/pokemonPaginationDto.model"
import { MinifiedPokemonDto } from "./pokemonMinified.model"

export type PokemonsDto = PokemonPaginationDto<MinifiedPokemonDto>
  

  