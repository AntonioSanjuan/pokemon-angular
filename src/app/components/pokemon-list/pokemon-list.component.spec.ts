import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { UsePokemons } from 'src/app/hooks/usePokemons/usePokemons.service';
import { UsePokemonsMock, UsePokemonsMockReset } from 'src/app/hooks/usePokemons/usePokemons.service.mock';
import { PokemonListFilterComponent } from '../pokemon-list-filter/pokemon-list-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PokemonTypePillDirective } from 'src/app/directives/pokemonTypeColor/pokemon-type-pill.directive';
import { IntersectionObserverDirective } from 'src/app/directives/intersectionObserver/intersectionObserver.directive';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock, UsePokemonTypesMockReset } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.mock';
import { UseFilterPokemonsMock, UseFilterPokemonsMockReset } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListComponent, PokemonListFilterComponent, PokemonTypePillDirective, IntersectionObserverDirective],
      imports: [SharedModule],
      providers: [
        {
          provide: UseFilterPokemons,
          useValue: UseFilterPokemonsMock
        },
        {
          provide: UsePokemons,
          useValue: UsePokemonsMock
        },
        {
          provide: UsePokemonTypes,
          useValue: UsePokemonTypesMock
        },
      ]
    });
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    UsePokemonsMockReset();
    UseFilterPokemonsMockReset();
    UsePokemonTypesMockReset()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isIntersecting should request fetchNextPokemons if intersecting && infiniteListScroll', () => {
    component.infiniteListScroll = true;

    component.isIntersecting(true)
    const fetchNextPokemonsSpy = jest.spyOn(UsePokemonsMock, "fetchNextPokemons")

    expect(fetchNextPokemonsSpy).toHaveBeenCalled()
  });

  it('isIntersecting shouldnt request fetchNextPokemons if intersecting && !infiniteListScroll', () => {
    component.infiniteListScroll = false;

    component.isIntersecting(true)
    const fetchNextPokemonsSpy = jest.spyOn(UsePokemonsMock, "fetchNextPokemons")

    expect(fetchNextPokemonsSpy).not.toHaveBeenCalled()
  });

  it('isIntersecting shouldnt request fetchNextPokemons if !intersecting && infiniteListScroll', () => {
    component.infiniteListScroll = true;

    component.isIntersecting(false)
    const fetchNextPokemonsSpy = jest.spyOn(UsePokemonsMock, "fetchNextPokemons")

    expect(fetchNextPokemonsSpy).not.toHaveBeenCalled()
  });

  it('isIntersecting shouldnt request fetchNextPokemons if !intersecting && !infiniteListScroll', () => {
    component.infiniteListScroll = false;

    component.isIntersecting(false)
    const fetchNextPokemonsSpy = jest.spyOn(UsePokemonsMock, "fetchNextPokemons")

    expect(fetchNextPokemonsSpy).not.toHaveBeenCalled()
  });

});
