import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UseDetailedPokemons } from './useDetailedPokemons.service';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokeApiServiceMock, PokeApiServiceMockInitialize } from 'src/app/services/poke-api/poke-api.service.mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRootState } from 'src/app/store/store';
import { IPokemon, IPokemons } from 'src/app/models/internals/pokemons.model';
import { selectDetailedPokemons, selectDetailedPokemonsByName, selectFilteredPokemons, selectPokemons } from 'src/app/store/data/data.selectors';
import { first, last, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { addPokemonsAction, setPokemonsAction } from 'src/app/store/data/data.actions';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';
import { IDetailedPokemons } from 'src/app/models/internals/detailedPokemons.model';

@Component({})
class DummyComponent {
  constructor(public useDetailedPokemons: UseDetailedPokemons) {}
}

describe('UsePokemons', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let store: MockStore<AppRootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      providers: [
        UseDetailedPokemons,
        provideMockStore<AppRootState>({
          initialState: undefined,
          selectors: [
            {
              selector: selectDetailedPokemons,
              value: undefined
            },
            // {
            //   selector: selectDetailedPokemonsByName,
            //   value: undefined
            // }
          ]
        }),
        { 
          provide: PokeApiService, 
          useValue: PokeApiServiceMock 
        },
      ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();

    PokeApiServiceMockInitialize()
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('loading$ should be false by default', () => {
    component.useDetailedPokemons.loading$.pipe(take(1)).subscribe((loading) => {
      expect(loading).toBeFalsy()
    })
  });

  it('getDetailedPokemon should return from storage detailed pokemon if its stored', () => {
    const detailedPokemonNameSut = 'detailedPokemonNameTest'
    const detailedPokemonSut = {
      name: detailedPokemonNameSut
    } as IPokemon

    //set storage
    const storedDetailedPokemons = {
      data: [
        detailedPokemonSut,
        {} as IPokemon,
      ]
    } as IDetailedPokemons ;

    store.overrideSelector(selectDetailedPokemons, storedDetailedPokemons);
    store.refreshState();
    fixture.detectChanges()
    
    component.useDetailedPokemons.getDetailedPokemon([detailedPokemonNameSut]).pipe(take(1)).subscribe((detailedPokemons) => {
      expect(detailedPokemons).toEqual({
        data: [detailedPokemonSut]
      } as IDetailedPokemons)
    })
  });

  it('getDetailedPokemon should request from service detailed pokemon if its !stored', () => {
    const detailedPokemonNameSut = 'detailedPokemonNameTest'
    const detailedPokemonSut = {
      data: [
        {
          name: detailedPokemonNameSut
        } as IPokemon
      ]
    } as IDetailedPokemons

    //set storage
    const storedDetailedPokemons = {
      data: [
        {} as IPokemon,
        {} as IPokemon,
      ]
    } as IDetailedPokemons ;

    store.overrideSelector(selectDetailedPokemons, storedDetailedPokemons);
    store.refreshState();
    fixture.detectChanges()
    
    const getDetailedPokemonSpy = jest.spyOn(PokeApiServiceMock, 'getDetailedPokemon').mockReturnValue(of(detailedPokemonSut))

    component.useDetailedPokemons.getDetailedPokemon([detailedPokemonNameSut]).pipe(take(1)).subscribe((detailedPokemons) => {
      expect(getDetailedPokemonSpy).toHaveBeenCalledWith(detailedPokemonNameSut)
      expect(detailedPokemons).toEqual(detailedPokemonSut)
    })
  });
})
