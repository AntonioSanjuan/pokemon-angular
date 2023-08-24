export interface IPokemonFilter<T> {
    byName?: string
    byType?: string
    data: T[]
}

export class PokemonFilter<T> implements IPokemonFilter<T> {
    public byName?: string
    public byType?: string
    public data: T[]

    constructor(
        data: T[],
        byName?: string,
        byType?: string,
    ) {
        this.byName = byName;
        this.byType = byType;
        this.data = data;
    }
}
