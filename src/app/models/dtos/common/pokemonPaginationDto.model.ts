export interface PokemonPaginationDto<T> {
    count: number
    next?: string
    previous?: string
    results: T[]
  }