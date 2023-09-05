import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonComparisonComponent } from './add-pokemon-comparison.component';

describe('AddPokemonComparisonComponent', () => {
  let component: AddPokemonComparisonComponent;
  let fixture: ComponentFixture<AddPokemonComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPokemonComparisonComponent]
    });
    fixture = TestBed.createComponent(AddPokemonComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
