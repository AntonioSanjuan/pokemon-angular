import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonComparisonComponent } from './add-pokemon-comparison.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeModule } from 'src/app/pages/home/home.module';
import { UsePopUp } from 'src/app/hooks/usePopUp/usePopUp.service';
import { UsePopUpMock, UsePopUpMockReset } from 'src/app/hooks/usePopUp/usePopUp.service.mock';
import { IPokemon } from 'src/app/models/internals/pokemons.model';

describe('AddPokemonComparisonComponent', () => {
  let component: AddPokemonComparisonComponent;
  let fixture: ComponentFixture<AddPokemonComparisonComponent>;
  let popUpIdSut: string = 'popUpIdSutTest'
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddPokemonComparisonComponent,
      ],
      imports: [SharedModule, HomeModule],
      providers: [
        {
          provide: UsePopUp,
          useValue: UsePopUpMock
        },
      ],
      
    });
    fixture = TestBed.createComponent(AddPokemonComparisonComponent);
    component = fixture.componentInstance;
    component.popUpData = {
      id: popUpIdSut
    }
    fixture.detectChanges();
  });

  afterEach(() => {
    UsePopUpMockReset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('compareWith sould request close popUpWith', () => {
    const pokemonSut = {
      id: 1
    } as IPokemon
    const closeSpy = jest.spyOn(UsePopUpMock, 'close')

    expect(closeSpy).not.toHaveBeenCalled()
    
    component.compareWith(pokemonSut)

    expect(closeSpy).toHaveBeenCalledWith(popUpIdSut, pokemonSut)

  });
});
