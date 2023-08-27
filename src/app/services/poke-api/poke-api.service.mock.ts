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
const getFilteredPokemonsByNameSpy = jest.fn((): Observable<IFilteredPokemons> => {
  return of(getFilteredPokemonsResponseMock)
})

export const PokeApiServiceMock: Partial<PokeApiService> = {
  getPokemons: getPokemonsSpy,
  getPokemonTypes: getPokemonTypesSpy,
  getFilteredPokemonsByType: getFilteredPokemonsByTypeSpy,
  getFilteredPokemonsByName: getFilteredPokemonsByNameSpy
}

export const PokeApiServiceMockInitialize = () => {
  getPokemonsSpy.mockReturnValue(of(getPokemonsResponseMock))
  getPokemonTypesSpy.mockReturnValue(of(getPokemonTypesResponseMock))
  getFilteredPokemonsByTypeSpy.mockReturnValue(of(getFilteredPokemonsResponseMock))
  getFilteredPokemonsByNameSpy.mockReturnValue(of(getFilteredPokemonsResponseMock))
}

const getPokemonsResponseMock: IPokemons = {
  numberOfElements: 5,
  currentPage: 0,
  data: [
    {
      name: 'pokemonName_1',
      image: 'pokemonImage_1',
      weight: 1,
      height: 1,
      types: []
    },
    {
      name: 'pokemonName_2',
      image: 'pokemonImage_2',
      weight: 2,
      height: 2,
      types: []
    },
    {
      name: 'pokemonName_3',
      image: 'pokemonImage_3',
      weight: 3,
      height: 3,
      types: []
    },
    {
      name: 'pokemonName_4',
      image: 'pokemonImage_4',
      weight: 4,
      height: 4,
      types: []
    },
    {
      name: 'pokemonName_5',
      image: 'pokemonImage_5',
      weight: 5,
      height: 5,
      types: []
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
      name: 'pokemonName_1',
      image: 'pokemonImage_1',
      weight: 1,
      height: 1,
      types: []
    },
    {
      name: 'pokemonName_2',
      image: 'pokemonImage_2',
      weight: 2,
      height: 2,
      types: []
    },
    {
      name: 'pokemonName_3',
      image: 'pokemonImage_3',
      weight: 3,
      height: 3,
      types: []
    },
  ]
}