export interface IPokemonImages {
    normal: string,
    shiny: string
}

export class PokemonImages implements IPokemonImages {
    constructor(        
        public normal: string,
        public shiny: string) {}
}