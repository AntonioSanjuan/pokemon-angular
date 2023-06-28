import { PokemonPaginationDto } from "src/app/models/dtos/common/pokemonPaginationDto.model";
import { PokemonDto } from "src/app/models/dtos/pokemonDto.model";
import { IPokemon, IPokemons, Pokemon, Pokemons } from "src/app/models/internals/pokemons.model";
import { Adapter } from "../common/adapter";
import { IPokemonTypes, PokemonType, PokemonTypes } from "src/app/models/internals/pokemonTypes.model";
import { PokemonTypeDto } from "src/app/models/dtos/pokemonType.model";
import { PokemonTypesDto } from "src/app/models/dtos/pokemonTypesDto.model";

export class PokemonAdapter implements Adapter<IPokemon> {
    adapt(pokemon: PokemonDto): IPokemon {
      return new Pokemon(
        pokemon.name, 
        pokemon.sprites.front_default,
        pokemon.weight,
        pokemon.height,
        pokemon.types.map((pokemonType) => new PokemonType(pokemonType.type.name))
        )
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
    adapt(pokemonTypes: PokemonTypesDto): IPokemonTypes {
        return new PokemonTypes(
            pokemonTypes.results.map((pokemonType: PokemonTypeDto) => {
                return new PokemonType(pokemonType.name)
            })
        )
      }
}