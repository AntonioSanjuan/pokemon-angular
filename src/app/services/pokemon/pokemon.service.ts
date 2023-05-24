import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonsDto } from 'src/app/models/dtos/pokemonsDto.model';
import { Observable } from 'rxjs';
import { PokemonDto } from 'src/app/models/dtos/pokemonDto.model';

@Injectable()
export class PokemonService {
  private limit: number = 20;

  constructor(private http: HttpClient) {}

  public getPokemons(page: number): Observable<PokemonsDto> {
    return this.http.get<PokemonsDto>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${page * this.limit}`)
  }

  public getPokemon(PokemonName: string): Observable<PokemonDto> {
    return this.http.get<PokemonDto>(`https://pokeapi.co/api/v2/pokemon/${PokemonName.toLowerCase()}`)
  }
}
