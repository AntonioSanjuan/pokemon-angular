
const PokemonColorByType = {
    normal: 'black',
    fighting: 'red',
    flying: 'blue',
    poison: 'green',
    fairy: 'yellow',
    dark: 'brown',
    grass: '',
    water: '',
    fire: '',
    steel: '',
    ghost: '',
    electric: '',
    ground: '',
    bug: '',
    dragon: '',
    psychic: '',
    ice: '',
    rock: '',
    unknown: '',
    shadow: ''
}

export interface IPokemonType {
    name: string
}

export class PokemonType implements IPokemonType {
    name: string;
    color: string;
    constructor(name: any) {
        this.name = name;
        this.color = PokemonColorByType[name as keyof typeof PokemonColorByType] || PokemonColorByType.dark
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