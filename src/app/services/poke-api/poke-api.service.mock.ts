import { Observable, of } from "rxjs"
import { IPokemons } from "src/app/models/internals/pokemons.model"
import { PokeApiService } from "./poke-api.service"
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model"
import { IFilteredPokemons } from "src/app/models/internals/filteredPokemons.model"

const getPokemonsSpy = jest.fn((): Observable<IPokemons> => {
  return of(getPokemonsResponseMock)
})
const getPokemonTypesSpy = jest.fn((): Observable<IPokemonTypes> => {
  return of(getPokemonTypesResponseMock)
})
const getFilteredPokemonsByTypeSpy = jest.fn((): Observable<IFilteredPokemons> => {
  return of(getFilteredPokemonsResponseMock)
})
const getDetailedPokemonSpy = jest.fn((): Observable<IFilteredPokemons> => {
  return of(getFilteredPokemonsResponseMock)
})
const getFilteredPokemonsByNameSpy = jest.fn((): Observable<IFilteredPokemons> => {
  return of(getFilteredPokemonsResponseMock)
})

export const PokeApiServiceMock: Partial<PokeApiService> = {
  getPokemons: getPokemonsSpy,
  getPokemonTypes: getPokemonTypesSpy,
  getDetailedPokemon: getDetailedPokemonSpy,
  getFilteredPokemonsByType: getFilteredPokemonsByTypeSpy,
  getFilteredPokemonsByName: getFilteredPokemonsByNameSpy
}

export const PokeApiServiceMockInitialize = () => {
  getPokemonsSpy.mockReturnValue(of(getPokemonsResponseMock))
  getPokemonTypesSpy.mockReturnValue(of(getPokemonTypesResponseMock))
  getDetailedPokemonSpy.mockReturnValue(of(getFilteredPokemonsResponseMock))
  getFilteredPokemonsByTypeSpy.mockReturnValue(of(getFilteredPokemonsResponseMock))
  getFilteredPokemonsByNameSpy.mockReturnValue(of(getFilteredPokemonsResponseMock))
}

const getPokemonsResponseMock: IPokemons = {
  numberOfElements: 5,
  currentPage: 0,
  data: [
    {
      id: 1,
      name: 'pokemonName_1',
      images: {
        normal: 'pokemonNormalImage_1',
        shiny: 'pokemonShinyImage_1'
      },      weight: 1,
      height: 1,
      types: [],
      moves: [],
      stats: {
        specialAttack: 1,
        specialDefense: 2,
        defense: 3,
        attack: 4,
        hp: 5,
        speed: 6
      }
    },
    {
      id: 2,
      name: 'pokemonName_2',
      images: {
        normal: 'pokemonNormalImage_2',
        shiny: 'pokemonShinyImage_2'
      },      weight: 2,
      height: 2,
      types: [],
      moves: [],
      stats: {
        specialAttack: 1,
        specialDefense: 2,
        defense: 3,
        attack: 4,
        hp: 5,
        speed: 6
      }
    },
    {
      id: 3,
      name: 'pokemonName_3',
      images: {
        normal: 'pokemonNormalImage_3',
        shiny: 'pokemonShinyImage_3'
      },      weight: 3,
      height: 3,
      types: [],
      moves: [],
      stats: {
        specialAttack: 1,
        specialDefense: 2,
        defense: 3,
        attack: 4,
        hp: 5,
        speed: 6
      }
    },
    {
      id: 4,
      name: 'pokemonName_4',
      images: {
        normal: 'pokemonNormalImage_4',
        shiny: 'pokemonShinyImage_4'
      },      weight: 4,
      height: 4,
      types: [],
      moves: [],
      stats: {
        specialAttack: 1,
        specialDefense: 2,
        defense: 3,
        attack: 4,
        hp: 5,
        speed: 6
      }
    },
    {
      id: 5,
      name: 'pokemonName_5',
      images: {
        normal: 'pokemonNormalImage_5',
        shiny: 'pokemonShinyImage_5'
      },      weight: 5,
      height: 5,
      types: [],
      moves: [],
      stats: {
        specialAttack: 1,
        specialDefense: 2,
        defense: 3,
        attack: 4,
        hp: 5,
        speed: 6
      }
    }
  ]
}

const getPokemonTypesResponseMock: IPokemonTypes = {
  data: [
    {
      name: 'type0'
    },
    {
      name: 'type1'
    },
    {
      name: 'type2'
    },
    {
      name: 'type3'
    },
    {
      name: 'type4'
    },
    {
      name: 'type5'
    },
  ]
}

const getFilteredPokemonsResponseMock: IFilteredPokemons = {
  byName: 'byNameTestFilter',
  byType: 'byTypeTestFilter',
  data: [
    {
      id: 1,
      name: 'pokemonName_1',
      images: {
        normal: 'pokemonNormalImage_1',
        shiny: 'pokemonShinyImage_1'
      },
      weight: 1,
      height: 1,
      types: [],
      moves: [],
      stats: {
        specialAttack: 1,
        specialDefense: 2,
        defense: 3,
        attack: 4,
        hp: 5,
        speed: 6
      }
    },
    {
      id: 2,
      name: 'pokemonName_2',
      images: {
        normal: 'pokemonNormalImage_2',
        shiny: 'pokemonShinyImage_2'
      },
      weight: 2,
      height: 2,
      types: [],
      moves: [],
      stats: {
        specialAttack: 1,
        specialDefense: 2,
        defense: 3,
        attack: 4,
        hp: 5,
        speed: 6
      }
    },
    {
      id: 3,
      name: 'pokemonName_3',
      images: {
        normal: 'pokemonNormalImage_3',
        shiny: 'pokemonShinyImage_3'
      },
      weight: 3,
      height: 3,
      types: [],
      moves: [],
      stats: {
        specialAttack: 1,
        specialDefense: 2,
        defense: 3,
        attack: 4,
        hp: 5,
        speed: 6
      }
    },
  ]
}