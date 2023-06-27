import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListFilterComponent } from './pokemon-list-filter.component';

describe('PokemonListFilterComponent', () => {
  let component: PokemonListFilterComponent;
  let fixture: ComponentFixture<PokemonListFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListFilterComponent]
    });
    fixture = TestBed.createComponent(PokemonListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
