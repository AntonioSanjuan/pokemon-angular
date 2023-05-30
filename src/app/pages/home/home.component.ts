import { Component } from '@angular/core';
import { usePokemons } from 'src/app/hooks/pokemons/usePokemons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private page: number = 0;
  protected readonly pokemons = usePokemons()
  
  async ngOnInit() {
    this.pokemons.pokemons$.subscribe((pokemons) => {
      console.log("pokemons", pokemons)
    })

    this.pokemons.fetchPokemons(this.page)
  }
  
}
