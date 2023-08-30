import { Directive, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPokemonId]'
})
export class PokemonIdDirective implements OnInit {
  @Input() pokemonId?: number;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    if(this.pokemonId) {
        const formattedValue = this.pokemonId.toString().padStart(4, '0');
        this.el.nativeElement.textContent = `N: ${formattedValue}`;
    }
   }	

}
