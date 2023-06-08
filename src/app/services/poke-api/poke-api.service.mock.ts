import { Observable, of } from "rxjs"
import { IPokemons } from "src/app/models/internals/pokemons.model"
import { PokeApiService } from "./poke-api.service"

export const PokeApiServiceMock: Partial<PokeApiService> = {
  getPokemons: jest.fn((): Observable<IPokemons> => {
    return of(getPokemonsResponseMock)
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