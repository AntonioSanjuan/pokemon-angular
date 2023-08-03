
const PokemonColorByType = {
    normal: '#a4acaf',
    fighting: '#d56723',
    flying: '#3dc7ef',
    poison: '#b97fc9',
    fairy: '#fdb9e9',
    dark: '#707070',
    grass: '#9bcc50',
    water: '#4592c4',
    fire: '#fd7d24',
    steel: '#9eb7',
    ghost: '#7b62',
    electric: '#eed535',
    ground: '#f7de3f',
    bug: '#729f3f',
    dragon: '#53a4cf',
    psychic: '#f366b9',
    ice: '#51c4e7',
    rock: '#a38c21',
    unknown: '',
    shadow: '#707070'
}

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