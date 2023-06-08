import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { UsePokemonsMock } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(() => {
    TestBed.overrideComponent(
      HomeComponent,
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
      imports: [HomeModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
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
