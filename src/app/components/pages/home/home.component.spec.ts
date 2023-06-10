import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { PokemonsDisplayer } from 'src/app/domain/pokemons-displayer/pokemons-displayer';
import { PokemonsDisplayerMock } from 'src/app/domain/pokemons-displayer/pokemons-displayer.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(() => {
    TestBed.overrideComponent(
      HomeComponent,
      {
        set: {
          providers: [{
            provide: PokemonsDisplayer,
            useValue: PokemonsDisplayerMock
          }]
        }
      }
    );

    TestBed.configureTestingModule({
      imports: [HomeModule],
    }).compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should request fetchPokemons', () => {
    const fetchPokemonsSpy = jest.spyOn(PokemonsDisplayerMock, 'fetchPokemons')

    component.ngOnInit()
    fixture.detectChanges()

    expect(fetchPokemonsSpy).toHaveBeenCalledWith(0)

  });

});
