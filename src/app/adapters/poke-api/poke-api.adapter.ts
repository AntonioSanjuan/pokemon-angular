import { PokemonPaginationDto } from "src/app/models/dtos/common/pokemonPaginationDto.model";
import { PokemonDto } from "src/app/models/dtos/pokemonDto.model";
import { IPokemon, IPokemons, Pokemon, Pokemons } from "src/app/models/internals/pokemons.model";
import { Adapter } from "../common/adapter";
import { IPokemonType, IPokemonTypes, PokemonType, PokemonTypes } from "src/app/models/internals/pokemonTypes.model";
import { PokemonTypeDto } from "src/app/models/dtos/pokemonType.model";
import { PokemonTypesDto } from "src/app/models/dtos/pokemonTypesDto.model";

export class PokeApiAdapter implements Adapter<IPokemon> {
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

export class PokemonTypesAdapter implements Adapter<IPokemonTypes> {
    adapt(item: PokemonTypesDto): IPokemonTypes {
        return new PokemonTypes(
            item.results.map((pokemonType: PokemonTypeDto) => {
                return new PokemonType(pokemonType.name)
            })
        )
      }
}