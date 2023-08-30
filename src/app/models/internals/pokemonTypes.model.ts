export interface IPokemonType {
    name: string
}

export class PokemonType implements IPokemonType {
    name: string;
    constructor(name: any) {
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