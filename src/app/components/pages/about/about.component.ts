import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsDisplayer } from 'src/app/domain/pokemons-displayer/pokemons-displayer';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [PokemonsDisplayer]

})
export class AboutComponent {

  constructor(
    public usePokemons: PokemonsDisplayer,
    private router: Router, 
  ) {}

  private page: number = 0;
  
  async ngOnInit() {
    this.usePokemons.fetchPokemons(this.page)
  }

  public goToOther() {
    this.router.navigate(['/about',]);
  }

  public goToHome() {
    this.router.navigate(['/home',]);
  }
}
