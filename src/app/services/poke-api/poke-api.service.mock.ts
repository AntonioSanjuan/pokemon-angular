import { Observable, of } from "rxjs"
import { IPokemons } from "src/app/models/internals/pokemons.model"
import { PokeApiService } from "./poke-api.service"
import { IPokemonTypes } from "src/app/models/internals/pokemonTypes.model"

export const PokeApiServiceMock: Partial<PokeApiService> = {
  getPokemons: jest.fn((): Observable<IPokemons> => {
    return of(getPokemonsResponseMock)
  }),
  getPokemonTypes: jest.fn((): Observable<IPokemonTypes> => {
    return of(getPokemonTypesResponseMock)
  })
}

const getPokemonsResponseMock: IPokemons = {
  numberOfElements: 5,
  currentPage: 0,
  data: [
    {
      name: 'pokemonName_1',
      image: 'pokemonImage_1'
    },
    {
      name: 'pokemonName_2',
      image: 'pokemonImage_2'
    },
    {
      name: 'pokemonName_3',
      image: 'pokemonImage_3'
    },
    {
      name: 'pokemonName_4',
      image: 'pokemonImage_4'
    },
    {
      name: 'pokemonName_5',
      image: 'pokemonImage_5'
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