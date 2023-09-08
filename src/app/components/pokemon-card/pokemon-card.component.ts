import { Component, Input } from '@angular/core';
import { shakeAnimation } from 'src/app/animations/shake/shake.animation';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  animations: [shakeAnimation]
})
export class PokemonCardComponent {
  @Input() public pokemon!: IPokemon | undefined;
  @Input() public isLoading!: boolean;

  public animationActive = false;

  public toggle(): void {
    this.animationActive = !this.animationActive;
  }
}
