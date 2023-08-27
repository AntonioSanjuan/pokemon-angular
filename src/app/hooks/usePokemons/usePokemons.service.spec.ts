import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsePokemons } from './usePokemons.service';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokeApiServiceMock, PokeApiServiceMockInitialize } from 'src/app/services/poke-api/poke-api.service.mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRootState } from 'src/app/store/store';
import { IPokemons } from 'src/app/models/internals/pokemons.model';
import { selectPokemons } from 'src/app/store/data/data.selectors';
import { first, last, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { addPokemonsAction, setPokemonsAction } from 'src/app/store/data/data.actions';

@Component({})
class DummyComponent {
  constructor(public usePokemons: UsePokemons) {}
}

describe('UsePokemons', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let store: MockStore<AppRootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      providers: [
        UsePokemons,
        provideMockStore<AppRootState>({
          initialState: undefined,
          selectors: [
            {
              selector: selectPokemons,
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
    component.usePokemons.loading$.pipe(take(1)).subscribe((loading) => {
      expect(loading).toBeFalsy()
    })
  });

  it('pokemons$ should be undefined by default', () => {
    component.usePokemons.pokemons$.pipe(take(1)).subscribe((pokemons) => {
      expect(pokemons).toBeUndefined()
    })
  });

  it('pokemons$ should has the last stored pokemons state', () => {
    //set storage
    const storedPokemons = {
      currentPage: 1,
      data: [
        {}, {}
      ]
    } as IPokemons;

    store.overrideSelector(selectPokemons, storedPokemons);
    store.refreshState();
    fixture.detectChanges()
    
    component.usePokemons.pokemons$.pipe(take(1)).subscribe((pokemons) => {
      expect(pokemons).toEqual(storedPokemons)
    })
  });

  it('prefetchPokemons should fetch from storage if it exists', (done) => {
    //set storage
    const storedPokemons = {
      currentPage: 1,
      data: [
        {}, {}
      ]
    } as IPokemons;

    const getPokemonsSpy = jest.spyOn(PokeApiServiceMock, 'getPokemons')

    store.overrideSelector(selectPokemons, storedPokemons);
    store.refreshState();
    fixture.detectChanges()

    component.usePokemons.prefetchPokemons().pipe(take(1)).subscribe((pokemons: IPokemons | undefined) => {
      expect(pokemons).toBe(storedPokemons);
      expect(getPokemonsSpy).not.toHaveBeenCalled()

      done()
    })

  });

  it('prefetchPokemons should fetch from service & store it, if doesnt exists stored pokemons', (done) => {
    //set storage
    const fetchedPokemons = {
      currentPage: 0,
      data: [
        {}, {}
      ]
    } as IPokemons;

    const getPokemonsSpy = jest.spyOn(PokeApiServiceMock, 'getPokemons').mockReturnValue(of(fetchedPokemons))
    const dispatchSpy = jest.spyOn(store, 'dispatch')

    component.usePokemons.prefetchPokemons().pipe(take(1)).subscribe((pokemons: IPokemons | undefined) => {
      expect(pokemons).toBe(fetchedPokemons);
      expect(getPokemonsSpy).toHaveBeenCalledWith(0)
      expect(dispatchSpy).toHaveBeenCalledWith(setPokemonsAction(fetchedPokemons))
      done()
    })
  });

  it('fetchNextPokemons should fetch from service the next page based on stored pokemons', (done) => {
    //set storage
    const sutStoredPokemonsPage = 2
    const storedPokemons = {
      currentPage: sutStoredPokemonsPage,
      data: [
        {}, {}
      ]
    } as IPokemons;

    const fetchedPokemons = {
      currentPage: sutStoredPokemonsPage + 1,
      data: [
        {}, {}
      ]
    } as IPokemons;

    store.overrideSelector(selectPokemons, storedPokemons);
    store.refreshState();
    fixture.detectChanges()

    const getPokemonsSpy = jest.spyOn(PokeApiServiceMock, 'getPokemons').mockReturnValue(of(fetchedPokemons))
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    
    component.usePokemons.fetchNextPokemons();

    component.usePokemons.pokemons$.pipe(take(5)).subscribe((pokemons: IPokemons | undefined) => {
      expect(getPokemonsSpy).toHaveBeenCalledWith(sutStoredPokemonsPage + 1)
      expect(dispatchSpy).toHaveBeenCalledWith(addPokemonsAction(fetchedPokemons))
      done()
    })
  });
});
