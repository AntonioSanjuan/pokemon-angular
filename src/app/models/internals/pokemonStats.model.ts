export interface IPokemonStats {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}

export class PokemonStats implements IPokemonStats {
    constructor(        
        public hp: number,
        public attack: number,
        public defense: number,
        public specialAttack: number,
        public specialDefense: number,
        public speed: number) {}
}