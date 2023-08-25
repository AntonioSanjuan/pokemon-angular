import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypePillComponent } from './pokemon-type-pill.component';
import { SkeletonDirective } from 'src/app/directives/skeleton/skeleton.directive';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';

describe('PokemonTypePillComponent', () => {
  let component: PokemonTypePillComponent;
  let fixture: ComponentFixture<PokemonTypePillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonTypePillComponent, SkeletonDirective, PokemonTypePillDirective]
    });
    fixture = TestBed.createComponent(PokemonTypePillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
