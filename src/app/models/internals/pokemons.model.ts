import { PokemonPagination } from "./common/pokemonPagination.model"

export type Pokemons = PokemonPagination<Pokemon>
  
export interface Pokemon {
    name: string
    image: string    
}
  