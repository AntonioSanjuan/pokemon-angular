import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UseFilterPokemons } from './useFilterPokemons.service';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokeApiServiceMock } from 'src/app/services/poke-api/poke-api.service.mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRootState } from 'src/app/store/store';
import { IPokemon, IPokemons } from 'src/app/models/internals/pokemons.model';
import { selectFilteredPokemon, selectPokemons } from 'src/app/store/data/data.selectors';
import { first, last, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { addPokemonsAction, setPokemonsAction } from 'src/app/store/data/data.actions';
import { IFilteredPokemons } from 'src/app/models/internals/filteredPokemons.model';

@Component({})
class DummyComponent {
  constructor(public useFilterPokemons: UseFilterPokemons) {}
}

describe('UsePokemons', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let store: MockStore<AppRootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      providers: [
        UseFilterPokemons,
        provideMockStore<AppRootState>({
          initialState: undefined,
          selectors: [
            {
              selector: selectFilteredPokemon,
              value: undefined
            }
          ]
        }),
        { provide: PokeApiService, useValue: PokeApiServiceMock },
      ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('loading$ should be false by default', () => {
    component.useFilterPokemons.loading$.pipe(take(1)).subscribe((loading) => {
      expect(loading).toBeFalsy()
    })
  });

  it('filteredPokemons$ should be undefined by default', () => {
    component.useFilterPokemons.filteredPokemons$.pipe(take(1)).subscribe((filteredPokemons) => {
      expect(filteredPokemons).toBeUndefined()
    })
  });

  it('filteredPokemons$ should has the last stored pokemons state', () => {
    //set storage
    const storedFilteredPokemons = {
      data: [
        {} as IPokemon,
        {} as IPokemon,
      ]
    } as IFilteredPokemons ;

    store.overrideSelector(selectFilteredPokemon, storedFilteredPokemons);
    store.refreshState();
    fixture.detectChanges()
    
    component.useFilterPokemons.filteredPokemons$.pipe(take(1)).subscribe((filteredPokemons) => {
      expect(filteredPokemons).toEqual(storedFilteredPokemons)
    })
  });

  it('filteredPokemons$ should be always the last storedFilteredPokemons', (done) => {
    const byNameFilterSut: string = 'byNameFilterTest';

    //set storage
    const storedFilteredPokemons = {
      byName: byNameFilterSut,
      data: [
        {} as IPokemon,
        {} as IPokemon,
      ]
    } as IFilteredPokemons ;


    store.overrideSelector(selectFilteredPokemon, storedFilteredPokemons);
    store.refreshState();
    fixture.detectChanges()

    component.useFilterPokemons.filteredPokemons$.pipe(take(1)).subscribe((filteredPokemons: IFilteredPokemons | undefined) => {
      expect(filteredPokemons).toEqual(storedFilteredPokemons)
      done()
    })
  });

  it('getByNamePokemons should fetch from service if it exists but doesnt match the previous stored filter', (done) => {
    const byNameFilterSut: string = 'byNameFilterTest';

    //set storage
    const storedFilteredPokemons = {
      byName: 'asdasd',
      data: [
        {} as IPokemon,
        {} as IPokemon,
      ]
    } as IFilteredPokemons ;

    const getFilteredPokemonsByNameSpy = jest.spyOn(PokeApiServiceMock, "getFilteredPokemonsByName")

    store.overrideSelector(selectFilteredPokemon, storedFilteredPokemons);
    store.refreshState();
    fixture.detectChanges()

    component.useFilterPokemons.getByNamePokemons(byNameFilterSut);

    component.useFilterPokemons.filteredPokemons$.pipe(take(5)).subscribe((filteredPokemons: IFilteredPokemons | undefined) => {
      expect(getFilteredPokemonsByNameSpy).toHaveBeenCalledWith(byNameFilterSut)
      done()
    })
  });

})
