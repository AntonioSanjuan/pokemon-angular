import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { UsePokemonsMock } from 'src/app/hooks/usePokemons/usePokemons.service.mock';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(
      PokemonListComponent,
      {
        set: {
          providers: [{
            provide: UsePokemons,
            useValue: UsePokemonsMock
          }]
        }
      }
    );

    TestBed.configureTestingModule({
      declarations: [PokemonListComponent]
    });
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request fetchPokemons', () => {
    const fetchPokemonsSpy = jest.spyOn(UsePokemonsMock, 'fetchPokemons')

    component.ngOnInit()
    fixture.detectChanges()

    expect(fetchPokemonsSpy).toHaveBeenCalledWith(0)
  });
});
