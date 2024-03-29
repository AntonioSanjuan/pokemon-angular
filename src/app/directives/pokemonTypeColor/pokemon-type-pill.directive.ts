import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

const PokemonColorByType = {
  normal: '#000000',
  fighting: '#ffffff',
  flying: '#000000',
  poison: '#ffffff',
  fairy: '#000000',
  dark: '#ffffff',
  grass: '#000000',
  water: '#ffffff',
  fire: '#ffffff',
  steel: '#000000',
  ghost: '#ffffff',
  electric: '#000000',
  ground: '#000000',
  bug: '#ffffff',
  dragon: '#ffffff',
  psychic: '#ffffff',
  ice: '#000000',
  rock: '#ffffff',
  unknown: '',
  shadow: '#000000'
}
const PokemonBackgroundColorByType = {
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

@Directive({
  selector: '[appPokemonTypePill]'
})
export class PokemonTypePillDirective {
  @Input() typeName?: string;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.typeName) {
      this.el.nativeElement.style.backgroundColor = PokemonBackgroundColorByType[this.typeName as keyof typeof PokemonBackgroundColorByType] || PokemonBackgroundColorByType.normal;
      this.el.nativeElement.style.color = PokemonColorByType[this.typeName as keyof typeof PokemonColorByType] || PokemonColorByType.normal
    }
   }	

}
