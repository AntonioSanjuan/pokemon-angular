export interface IPokemonType {
    name: string
}

export class PokemonType implements IPokemonType {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

export interface IPokemonTypes {
    data: IPokemonType[]
}
export class PokemonTypes implements IPokemonTypes {
    data: IPokemonType[]
    constructor(pokemonTypes: IPokemonType[]) {
        this.data = pokemonTypes;
    }
} 