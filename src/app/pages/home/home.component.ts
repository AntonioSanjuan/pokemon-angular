import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonManager } from 'src/app/services/pokemonManager/pokemonManager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public pokemonManager: PokemonManager,
    private router: Router, 
  ) {}

  private page: number = 0;
  
  async ngOnInit() {
    this.pokemonManager.fetchPokemons(this.page)
  }

  public goToOther() {
    this.router.navigate(['/about',]);

  }

  public goToHome() {
    this.router.navigate(['/home',]);
  }
}
