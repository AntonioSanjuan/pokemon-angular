import { PokemonPaginationDto } from "src/app/models/dtos/common/pokemonPaginationDto.model";
import { PokemonDto } from "src/app/models/dtos/pokemonDto.model";
import { IPokemon, IPokemons, Pokemon, Pokemons } from "src/app/models/internals/pokemons.model";
import { Adapter } from "../common/adapter";

export class PokemonAdapter implements Adapter<IPokemon> {
    adapt(item: PokemonDto): IPokemon {
      return new Pokemon(item.name, item.sprites.front_default)
    }
}
  
export class PokemonsAdapter implements Adapter<IPokemons> {
    adapt(
        {pagination, page, data}: 
        {pagination: PokemonPaginationDto<any>, page: number, data: IPokemon[]}
    ): IPokemons {
        return new Pokemons(pagination, page, data)
    }
}