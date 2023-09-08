import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokeApiServiceMock, PokeApiServiceMockInitialize } from 'src/app/services/poke-api/poke-api.service.mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRootState } from 'src/app/store/store';
import { selectPokemonTypes, selectPokemons } from 'src/app/store/data/data.selectors';
import { UsePokemonTypes } from './usePokemonTypes.service';
import { take, of } from 'rxjs';
import { IPokemonTypes } from 'src/app/models/internals/pokemonTypes.model';
import { setPokemonTypesAction } from 'src/app/store/data/data.actions';

@Component({})
class DummyComponent {
  constructor(public usePokemonTypes: UsePokemonTypes) {}
}

describe('UsePokemonTypes', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let store: MockStore<AppRootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      providers: [
        UsePokemonTypes,
        provideMockStore<AppRootState>({
          initialState: undefined,
          selectors: [
            {
              selector: selectPokemonTypes,
              value: undefined
            }
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
    component.usePokemonTypes.loading$.pipe(take(1)).subscribe((loading) => {
      expect(loading).toBeFalsy()
    })
  });

  it('pokemonTypes$ should be undefined by default', () => {
    component.usePokemonTypes.pokemonTypes$.pipe(take(1)).subscribe((pokemonTypes) => {
      expect(pokemonTypes).toBeUndefined()
    })
  });

  it('pokepokemonTypesmons$ should has the last stored pokemonTypes state', () => {
    //set storage
    const storedPokemonTypes = {
      data: [
        {}, {}
      ]
    } as IPokemonTypes;

    // store.overrideSelector(selectPokemonTypes, storedPokemonTypes);
    store.refreshState();
    fixture.detectChanges()
    
    component.usePokemonTypes.pokemonTypes$.pipe(take(1)).subscribe((pokemonTypes) => {
      expect(pokemonTypes).toEqual(storedPokemonTypes)
    })
  });

  it('prefetchPokemonTypes should fetch from storage if it exists', (done) => {
    //set storage
    const storedPokemonTypes = {
      data: [
        {}, {}
      ]
    } as IPokemonTypes;

    const getPokemonTypesSpy = jest.spyOn(PokeApiServiceMock, "getPokemonTypes")

    store.overrideSelector(selectPokemonTypes, storedPokemonTypes);

    store.refreshState();
    fixture.detectChanges()

    component.usePokemonTypes.prefetchPokemonTypes().pipe(take(1)).subscribe((pokemonTypes: IPokemonTypes | undefined) => {
      expect(pokemonTypes).toBe(storedPokemonTypes);
      expect(getPokemonTypesSpy).not.toHaveBeenCalled()

      done()
    })

  });

  it('prefetchPokemonTypes should fetch from service & store it, if doesnt exists stored pokemons', (done) => {
    //set storage
    const fetchedPokemonTypes = {
      data: [
        {}, {}
      ]
    } as IPokemonTypes;

    const getPokemonTypesSpy = jest.spyOn(PokeApiServiceMock, "getPokemonTypes").mockReturnValue(of(fetchedPokemonTypes))
    const dispatchSpy = jest.spyOn(store, 'dispatch')

    component.usePokemonTypes.prefetchPokemonTypes().pipe(take(1)).subscribe((pokemons: IPokemonTypes | undefined) => {
      expect(pokemons).toBe(fetchedPokemonTypes);
      expect(getPokemonTypesSpy).toHaveBeenCalled()
      expect(dispatchSpy).toHaveBeenCalledWith(setPokemonTypesAction(fetchedPokemonTypes))
      done()
    })
  });
});
