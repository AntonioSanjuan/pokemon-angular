import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFilterableListComponent } from './pokemon-filterable-list.component';

describe('PokemonFilterableListComponent', () => {
  let component: PokemonFilterableListComponent;
  let fixture: ComponentFixture<PokemonFilterableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonFilterableListComponent]
    });
    fixture = TestBed.createComponent(PokemonFilterableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
