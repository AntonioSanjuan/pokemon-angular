import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFilterableListComponent } from './pokemon-filterable-list.component';
import { UsePokemonsMock, UsePokemonsMockReset } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UseFilterPokemonsMock, UseFilterPokemonsMockReset } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';
import { mockGetter } from 'src/app/utils/tests/commonMocks';
import { of } from 'rxjs';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { By } from '@angular/platform-browser';
import { PokemonFilterComponent } from '../pokemon-filter/pokemon-filter.component';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock, UsePokemonTypesMockReset } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.mock';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';

describe('PokemonFilterableListComponent', () => {
  let component: PokemonFilterableListComponent;
  let fixture: ComponentFixture<PokemonFilterableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        PokemonFilterableListComponent,
        PokemonFilterComponent,
        PokemonListComponent,
        IntersectionObserverDirective,
      ],
      providers: [
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(PokemonFilterableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    UsePokemonsMockReset();
    UseFilterPokemonsMockReset();
    UsePokemonTypesMockReset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('deleteFiltersButton should exists if filteredPokemons', () => {
    mockGetter(UseFilterPokemonsMock, "filteredPokemons$", of({} as IFilteredPokemons))
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#deleteFiltersButton'));
    expect(btn).not.toBeNull()
  });

  it('deleteFiltersButton should not exists if !filteredPokemons', () => {
    // mockGetter(UseFilterPokemonsMock, "filteredPokemons$", of(undefined))
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('#deleteFiltersButton'));
    fixture.detectChanges();

    expect(btn).toBeNull()
  });

  it('filterByNameButton click should request deleteFilters', () => {
    const btn = fixture.debugElement.query(By.css('#filterByNameButton'));
    btn.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(UseFilterPokemonsMock.deleteFilters).toHaveBeenCalled()
    })
  });
});
