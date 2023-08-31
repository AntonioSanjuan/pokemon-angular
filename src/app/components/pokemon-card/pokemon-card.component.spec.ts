import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { SkeletonDirective } from 'src/app/directives/skeleton/skeleton.directive';
import { routesMock } from 'src/app/modules/routing/routing.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PokemonIdDirective } from 'src/app/directives/pokemonId/pokemon-id.directive';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonCardComponent, SkeletonDirective, PokemonIdDirective],
      imports: [RouterTestingModule.withRoutes(routesMock)]
    });
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
