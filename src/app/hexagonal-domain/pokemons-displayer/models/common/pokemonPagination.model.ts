export interface IPokemonPagination<T> {
    numberOfElements: number
    currentPage: number
    nextPage?: string
    prevPage?: string
    data: T[]
}

export class PokemonPagination<T> implements IPokemonPagination<T> {
    public numberOfElements: number
    public currentPage: number
    public data: T[]
    public nextPage?: string
    public prevPage?: string

    constructor(
        numberOfElements: number,
        currentPage: number,
        data: T[],
        nextPage?: string,
        prevPage?: string
    ) {
        this.numberOfElements = numberOfElements;
        this.currentPage = currentPage;
        this.data = data;
        this.nextPage = nextPage;
        this.prevPage = prevPage;
    }
}
