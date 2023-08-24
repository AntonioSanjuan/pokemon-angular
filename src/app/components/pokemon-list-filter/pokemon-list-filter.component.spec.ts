import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListFilterComponent } from './pokemon-list-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.mock';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UseFilterPokemonsMock } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';

describe('PokemonListFilterComponent', () => {
  let component: PokemonListFilterComponent;
  let fixture: ComponentFixture<PokemonListFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListFilterComponent],
      imports: [SharedModule],
      providers: [{
        provide: UsePokemonTypes,
        useValue: UsePokemonTypesMock
      },
      {
        provide: UseFilterPokemons,
        useValue: UseFilterPokemonsMock
      }]
    });
    fixture = TestBed.createComponent(PokemonListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
