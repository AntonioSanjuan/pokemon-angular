import { MinifiedPokemonDto } from "./pokemonMinified.model"

export interface PokemonsByTypeDto {
    damage_relations: DamageRelations
    game_indices: Index[]
    generation: Generation2
    id: number
    move_damage_class: MoveDamageClass
    moves: Mfe[]
    name: string
    names: Name[]
    past_damage_relations: any[]
    pokemon: PokemonByTypeDto[]
}
  
export interface DamageRelations {
    double_damage_from: DoubleDamageFrom[]
    double_damage_to: DoubleDamageTo[]
    half_damage_from: HalfDamageFrom[]
    half_damage_to: HalfDamageTo[]
    no_damage_from: any[]
    no_damage_to: NoDamageTo[]
}
  
export interface DoubleDamageFrom {
    name: string
    url: string
}
  
export interface DoubleDamageTo {
    name: string
    url: string
}
  
export interface HalfDamageFrom {
    name: string
    url: string
}
  
export interface HalfDamageTo {
    name: string
    url: string
}
  
export interface NoDamageTo {
    name: string
    url: string
}
  
export interface Index {
    game_index: number
    generation: Generation
}
  
export interface Generation {
    name: string
    url: string
}
  
export interface Generation2 {
    name: string
    url: string
}
  
export interface MoveDamageClass {
    name: string
    url: string
}
  
export interface Mfe {
    name: string
    url: string
}
  
export interface Name {
    language: Language
    name: string
}
  
export interface Language {
    name: string
    url: string
}
  
export interface PokemonByTypeDto {
    pokemon: MinifiedPokemonDto
    slot: number
}