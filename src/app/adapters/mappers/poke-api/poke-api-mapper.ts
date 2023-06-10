import { IPokemon, IPokemons, Pokemon, Pokemons } from "src/app/domain/pokemons-displayer/models/pokemons.model";
import { Mapper } from "../common/mapper";
import { PokemonDto } from "../../models/pokemonDto.model";
import { PokemonPaginationDto } from "../../models/common/pokemonPaginationDto.model";

export class PokeApiMapper implements Mapper<IPokemon> {
    adapt(item: PokemonDto): IPokemon {
      return new Pokemon(item.name, item.sprites.front_default)
    }
}
  
export class PokemonsAdapter implements Mapper<IPokemons> {
    adapt(
        {pagination, page, data}: 
        {pagination: PokemonPaginationDto<any>, page: number, data: IPokemon[]}
    ): IPokemons {
        return new Pokemons(pagination, page, data)
    }
}