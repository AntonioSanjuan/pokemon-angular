import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonComparisonComponent } from './add-pokemon-comparison.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { PokemonFilterableListComponent } from 'src/app/components/pokemon-filterable-list/pokemon-filterable-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UsePokemonsMock, UsePokemonsMockReset } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UseFilterPokemonsMock, UseFilterPokemonsMockReset } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { PokemonFilterComponent } from 'src/app/components/pokemon-filter/pokemon-filter.component';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock, UsePokemonTypesMockReset } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.mock';
import { PokemonListComponent } from 'src/app/components/pokemon-list/pokemon-list.component';
import { HomeModule } from 'src/app/pages/home/home.module';

describe('AddPokemonComparisonComponent', () => {
  let component: AddPokemonComparisonComponent;
  let fixture: ComponentFixture<AddPokemonComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddPokemonComparisonComponent,
      ],
      imports: [SharedModule, HomeModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ],
      
    });
    fixture = TestBed.createComponent(AddPokemonComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
