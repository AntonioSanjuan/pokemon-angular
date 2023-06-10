import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsDisplayer } from './pokemons-displayer';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokeApiServiceMock } from 'src/app/services/poke-api/poke-api.service.mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRootState } from 'src/app/store/store';
import { IPokemons } from 'src/app/models/internals/pokemons.model';
import { selectPokemons } from 'src/app/store/data/data.selectors';
import { first } from 'rxjs/operators';

@Component({})
class DummyComponent {
  constructor(public usePokemons: PokemonsDisplayer) {}
}

describe('UsePokemons', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let store: MockStore<AppRootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      providers: [
        PokemonsDisplayer,
        provideMockStore<AppRootState>({
          initialState: undefined,
          selectors: [
            {
              selector: selectPokemons,
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

  it('loading should be false by default', () => {
    component.usePokemons.loading$.subscribe((loading) => {
      expect(loading).toBeFalsy()
    })
  });

  it('pokemons should fetch from storage if exists & it has the requested page stored', (done) => {
    const sutPage = 0
    const sut = {
      currentPage: sutPage,
      data: [
        {}, {}
      ]
    } as IPokemons;

    store.overrideSelector(selectPokemons, sut);
    store.refreshState();
    fixture.detectChanges()

    const getPokemonsSpy = jest.spyOn(PokeApiServiceMock, 'getPokemons')
    component.usePokemons.fetchPokemons(sutPage)

    component.usePokemons.pokemons$.pipe(first()).subscribe((pokemons) => {
      expect(pokemons).toBe(sut);
      expect(getPokemonsSpy).not.toHaveBeenCalled()
      done();
    });
  });

  it('pokemons should fetch from service if storage exists but has not the requested page stored', (done) => {
    const sutStoredPage = 1
    const sutFetchedPage = 0
    const sut = {
      currentPage: sutStoredPage,
      data: [
        {
          name: 'PokemonName_0',
          image: 'PokemonImage_0'
        }, {}
      ]
    } as IPokemons;
    
    store.overrideSelector(selectPokemons, sut);
    store.refreshState();
    fixture.detectChanges()

    const getPokemonsSpy = jest.spyOn(PokeApiServiceMock, 'getPokemons')
    component.usePokemons.fetchPokemons(sutFetchedPage)

    component.usePokemons.pokemons$.pipe(first()).subscribe((pokemons) => {
      expect(pokemons).not.toBe(sut);
      expect(getPokemonsSpy).toHaveBeenCalled()
      done();
    });
  });

  it('pokemons should fetch from service if storage doesnt exists', (done) => {
    const sutPage = 0

    const getPokemonsSpy = jest.spyOn(PokeApiServiceMock, 'getPokemons')
    component.usePokemons.fetchPokemons(sutPage)

    component.usePokemons.pokemons$.pipe(first()).subscribe((pokemons) => {
      expect(getPokemonsSpy).toHaveBeenCalled()
      done();
    });
  });
});
