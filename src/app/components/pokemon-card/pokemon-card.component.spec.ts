import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { SkeletonDirective } from 'src/app/directives/skeleton/skeleton.directive';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonCardComponent, SkeletonDirective]
    });
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
