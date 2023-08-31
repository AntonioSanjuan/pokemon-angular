import { PokemonPaginationDto } from "src/app/models/dtos/common/pokemonPaginationDto.model";
import { PokemonDto } from "src/app/models/dtos/pokemonDto.model";
import { IPokemon, IPokemons, Pokemon, Pokemons } from "src/app/models/internals/pokemons.model";
import { Adapter } from "../common/adapter";
import { IPokemonTypes, PokemonType, PokemonTypes } from "src/app/models/internals/pokemonTypes.model";
import { PokemonTypeDto } from "src/app/models/dtos/pokemonType.model";
import { PokemonTypesDto } from "src/app/models/dtos/pokemonTypesDto.model";
import { FilteredPokemons, IFilteredPokemons } from "src/app/models/internals/filteredPokemons.model";
import { DetailedPokemons, IDetailedPokemons } from "src/app/models/internals/detailedPokemons.model";
import { PokemonStats } from "src/app/models/internals/pokemonStats.model";
import { PokemonImages } from "src/app/models/internals/pokemonImages.model";

export class PokemonAdapter implements Adapter<IPokemon> {
    adapt(pokemon: PokemonDto): IPokemon {
        return new Pokemon(
            pokemon.id,
            pokemon.name,
            new PokemonImages(
                pokemon.sprites.other["official-artwork"].front_default,
                pokemon.sprites.other["official-artwork"].front_shiny
            ),
            pokemon.weight,
            pokemon.height,
            pokemon.types.map((pokemonType) => new PokemonType(pokemonType.type.name)),
            pokemon.moves.map((move) => { return move.move.name}),
            new PokemonStats(
                pokemon.stats.find((stat) => { return stat.stat.name === "hp"})?.base_stat ?? 0,
                pokemon.stats.find((stat) => { return stat.stat.name === "attack"})?.base_stat ?? 0,
                pokemon.stats.find((stat) => { return stat.stat.name === "defense"})?.base_stat ?? 0,
                pokemon.stats.find((stat) => { return stat.stat.name === "special-attack"})?.base_stat ?? 0,
                pokemon.stats.find((stat) => { return stat.stat.name === "special-defense"})?.base_stat ?? 0,
                pokemon.stats.find((stat) => { return stat.stat.name === "speed"})?.base_stat ?? 0,
            )
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

export class FilteredPokemonsAdapter implements Adapter<IFilteredPokemons> {
    adapt(
        {byName, byType, data}: 
        {byName?: string, byType?: string, data: IPokemon[]}
    ): IFilteredPokemons {
        return new FilteredPokemons(data, byName, byType)
    }
}

export class DetailedPokemonsAdapter implements Adapter<IFilteredPokemons> {
    adapt({data}: {data: IPokemon[]}): IDetailedPokemons {
        return new DetailedPokemons(data)
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