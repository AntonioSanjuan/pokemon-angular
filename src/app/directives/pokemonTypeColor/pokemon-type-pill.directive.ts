import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPokemonTypePill]'
})
export class PokemonTypePillDirective {
  @Input() color!: string;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.color) {
      this.el.nativeElement.style.color = `color-contrast(wheat vs tan, sienna, #d2691e)`;
      this.el.nativeElement.style.backgroundColor = this.color;

    }
   }	

}
