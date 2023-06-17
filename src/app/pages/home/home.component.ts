import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UsePokemons]
})
export class HomeComponent {
  constructor(private router: Router) {}

  public goToAbout() {
    this.router.navigate(['/about']);
  }
}
