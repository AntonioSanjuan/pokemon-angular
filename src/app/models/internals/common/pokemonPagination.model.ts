export interface PokemonPagination<T> {
    numberOfElements: number
    currentPage: number
    nextPage?: string
    prevPage?: string
    data: T[]
}