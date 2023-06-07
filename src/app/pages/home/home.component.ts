import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public usePokemons: UsePokemons,
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
