import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopUpType, UsePopUp } from './usePopUp.service';
import { AddPokemonComparisonComponent } from 'src/app/components/common/popUps/add-pokemon-comparison/add-pokemon-comparison.component';
import { MatDialog } from '@angular/material/dialog';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { take, pipe } from 'rxjs';
import { PokemonFilterableListComponent } from 'src/app/components/pokemon-filterable-list/pokemon-filterable-list.component';
import { UsePokemons } from '../usePokemons/usePokemons.service';
import { UsePokemonsMock, UsePokemonsMockReset } from '../usePokemons/usePokemons.service.mock';
import { UsePokemonTypes } from '../usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock, UsePokemonTypesMockReset } from '../usePokemonTypes/usePokemonTypes.service.mock';
import { UseFilterPokemons } from '../useFilterPokemons/useFilterPokemons.service';
import { UseFilterPokemonsMock, UseFilterPokemonsMockReset } from '../useFilterPokemons/useFilterPokemons.service.mock';
import { PokemonListComponent } from 'src/app/components/pokemon-list/pokemon-list.component';
import { PokemonFilterComponent } from 'src/app/components/pokemon-filter/pokemon-filter.component';

@Component({})
class DummyComponent {
  constructor(public usePopUp: UsePopUp) {}
}

describe('UsePopUp', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyComponent,
        AddPokemonComparisonComponent,
        PokemonFilterableListComponent,
        PokemonListComponent,
        PokemonFilterComponent
      ],
      providers: [
        UsePopUp,
        MatDialog,
        ScrollStrategyOptions,
        {
          provide: UsePokemons,
          useValue: UsePokemonsMock
        },
        {
          provide: UsePokemonTypes,
          useValue: UsePokemonTypesMock
        },
        {
          provide: UseFilterPokemons,
          useValue: UseFilterPokemonsMock
        },
      ],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    UsePokemonsMockReset();
    UseFilterPokemonsMockReset();
    UsePokemonTypesMockReset();
  })

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('close dialog should trigger observable with closed data', (done) => {
    const outputSut = 'outputTest'
    const openedDialog = component.usePopUp.open<string>(PopUpType.addPokemonComparison)
    
    openedDialog.pipe(take(5)).subscribe((resp) => {
      expect(resp).toEqual(outputSut)
      done()
    })

    component.usePopUp.close(PopUpType.addPokemonComparison, outputSut)

  });

})
