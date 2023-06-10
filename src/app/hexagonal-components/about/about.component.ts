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
