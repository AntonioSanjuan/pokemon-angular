import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFilterComponent } from './pokemon-filter.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UsePokemonTypes } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service';
import { UsePokemonTypesMock, UsePokemonTypesMockReset } from 'src/app/hooks/usePokemonTypes/usePokemonTypes.service.mock';
import { UseFilterPokemons } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service';
import { UseFilterPokemonsMock, UseFilterPokemonsMockReset } from 'src/app/hooks/useFilterPokemons/useFilterPokemons.service.mock';
import { By } from '@angular/platform-browser';

describe('PokemonFilterComponent', () => {
  let component: PokemonFilterComponent;
  let fixture: ComponentFixture<PokemonFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonFilterComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: UsePokemonTypes,
          useValue: UsePokemonTypesMock
        },
        {
          provide: UseFilterPokemons,
          useValue: UseFilterPokemonsMock
        }
      ]
    });
    fixture = TestBed.createComponent(PokemonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  afterEach(() => {
    UseFilterPokemonsMockReset();
    UsePokemonTypesMockReset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filterByNameButton should be disabled if filterByNameInput value is undefined', () => {
    const btn = fixture.debugElement.query(By.css('#filterByNameButton'));
    expect(btn.nativeElement.disabled).toBeTruthy()
  });

  it('filterByNameButton should not be disabled if filterByNameInput value is defined', () => {
    const inputValueSut = 'inputValueTest'
    const input = fixture.debugElement.query(By.css('#filterByNameInput'));
    input.nativeElement.value = inputValueSut;
    input.nativeElement.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(input.nativeElement.value).toEqual(inputValueSut);

      const btn = fixture.debugElement.query(By.css('#filterByNameButton'));
      expect(btn.nativeElement.disabled).toBeFalsy()
    });
  });

  it('filterByNameButton click should request getByNamePokemons', () => {
    const inputValueSut = 'inputValueTest'
    const input = fixture.debugElement.query(By.css('#filterByNameInput'));
    input.nativeElement.value = inputValueSut;
    input.nativeElement.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const btn = fixture.debugElement.query(By.css('#filterByNameButton'));
      btn.triggerEventHandler('click', null);

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(UseFilterPokemonsMock.getByNameOrIdPokemons).toHaveBeenCalledWith(inputValueSut)
      })
    });
  });
});
