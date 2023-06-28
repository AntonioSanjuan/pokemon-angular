import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { UsePokemonsMock } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { PokemonListFilterComponent } from '../pokemon-list-filter/pokemon-list-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListComponent, PokemonListFilterComponent, PokemonTypePillDirective, IntersectionObserverDirective],
      imports: [SharedModule],
      providers: [{
        provide: UsePokemons,
        useValue: UsePokemonsMock
      }]
    });
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should request fetchPokemons', () => {
  //   const fetchPokemonsSpy = jest.spyOn(UsePokemonsMock, 'fetchPokemons')

  //   component.ngOnInit()
  //   fixture.detectChanges()

  //   expect(fetchPokemonsSpy).toHaveBeenCalledWith(0)
  // });
});
