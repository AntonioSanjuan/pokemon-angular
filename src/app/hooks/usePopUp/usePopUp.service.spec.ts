import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsePopUp } from './usePopUp.service';
import { AddPokemonComparisonComponent } from 'src/app/components/common/popUps/add-pokemon-comparison/add-pokemon-comparison.component';
import { MatDialog } from '@angular/material/dialog';

@Component({})
class DummyComponent {
  constructor(public usePopUp: UsePopUp) {}
}

describe('UsePopUp', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyComponent,
        AddPokemonComparisonComponent
      ],
      providers: [
        UsePopUp,
        {
          provide: MatDialog,
          useValue: {}
        }
      ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // it('loading$ should be false by default', () => {
  //   component.useFilterPokemons.loading$.pipe(take(1)).subscribe((loading) => {
  //     expect(loading).toBeFalsy()
  //   })
  // });

  // it('filteredPokemons$ should be undefined by default', () => {
  //   component.useFilterPokemons.filteredPokemons$.pipe(take(1)).subscribe((filteredPokemons) => {
  //     expect(filteredPokemons).toBeUndefined()
  //   })
  // });

  // it('filteredPokemons$ should has the last stored pokemons state', () => {
  //   //set storage
  //   const storedFilteredPokemons = {
  //     data: [
  //       {} as IPokemon,
  //       {} as IPokemon,
  //     ]
  //   } as IFilteredPokemons ;

  //   store.overrideSelector(selectFilteredPokemons, storedFilteredPokemons);
  //   store.refreshState();
  //   fixture.detectChanges()
    
  //   component.useFilterPokemons.filteredPokemons$.pipe(take(1)).subscribe((filteredPokemons) => {
  //     expect(filteredPokemons).toEqual(storedFilteredPokemons)
  //   })
  // });

  // it('filteredPokemons$ should be always the last storedFilteredPokemons', (done) => {
  //   const byNameFilterSut: string = 'byNameFilterTest';

  //   //set storage
  //   const storedFilteredPokemons = {
  //     byName: byNameFilterSut,
  //     data: [
  //       {} as IPokemon,
  //       {} as IPokemon,
  //     ]
  //   } as IFilteredPokemons ;


  //   store.overrideSelector(selectFilteredPokemons, storedFilteredPokemons);
  //   store.refreshState();
  //   fixture.detectChanges()

  //   component.useFilterPokemons.filteredPokemons$.pipe(take(1)).subscribe((filteredPokemons: IFilteredPokemons | undefined) => {
  //     expect(filteredPokemons).toEqual(storedFilteredPokemons)
  //     done()
  //   })
  // });

  // it('getByNamePokemons should fetch from service if it exists but doesnt match the previous stored filter', (done) => {
  //   const byNameFilterSut: string = 'byNameFilterTest';

  //   //set storage
  //   const storedFilteredPokemons = {
  //     byName: 'asdasd',
  //     data: [
  //       {} as IPokemon,
  //       {} as IPokemon,
  //     ]
  //   } as IFilteredPokemons ;

  //   const getFilteredPokemonsByNameSpy = jest.spyOn(PokeApiServiceMock, "getFilteredPokemonsByName")

  //   store.overrideSelector(selectFilteredPokemons, storedFilteredPokemons);
  //   store.refreshState();
  //   fixture.detectChanges()

  //   component.useFilterPokemons.getByNameOrIdPokemons(byNameFilterSut);

  //   component.useFilterPokemons.filteredPokemons$.pipe(take(5)).subscribe((filteredPokemons: IFilteredPokemons | undefined) => {
  //     expect(getFilteredPokemonsByNameSpy).toHaveBeenCalledWith(byNameFilterSut)
  //     done()
  //   })
  // });

})
