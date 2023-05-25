import { IPokemonPagination } from "./common/pokemonPagination.model"

export type Pokemons = IPokemonPagination<IPokemon>
  


export interface IPokemon {
    name: string
    image: string    
}
  
export class Pokemon implements IPokemon {
    public name: string
    public image: string 
    
    constructor(name: string, image: string){
        this.name = name;
        this.image = image
    }
}