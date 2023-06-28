import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypePillComponent } from './pokemon-type-pill.component';

describe('PokemonTypePillComponent', () => {
  let component: PokemonTypePillComponent;
  let fixture: ComponentFixture<PokemonTypePillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonTypePillComponent]
    });
    fixture = TestBed.createComponent(PokemonTypePillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
