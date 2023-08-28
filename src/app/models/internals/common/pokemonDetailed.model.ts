export interface IPokemonDetails<T> {
    data: T[]
}

export class PokemonDetails<T> implements IPokemonDetails<T> {
    public data: T[]

    constructor(
        data: T[],
    ) {
        this.data = data;
    }
}
