import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';
import { PokeApiServiceMock, PokeApiServiceMockInitialize } from 'src/app/services/poke-api/poke-api.service.mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRootState } from 'src/app/store/store';
import { IPokemons } from 'src/app/models/internals/pokemons.model';
import { selectPokemons } from 'src/app/store/data/data.selectors';
import { first, last, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { addPokemonsAction, setPokemonsAction } from 'src/app/store/data/data.actions';
import { UsePokemonTypes } from './usePokemonTypes.service';

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
});
