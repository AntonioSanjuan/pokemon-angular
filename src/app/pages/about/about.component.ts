import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [UsePokemons]

})
export class AboutComponent {
  constructor() {}
}
