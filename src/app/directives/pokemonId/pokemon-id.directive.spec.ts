import { Component, DebugElement, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PokemonIdDirective } from './pokemon-id.directive';

@Component({
    template: `
    <p       
        id="pokemonNumber"
        appPokemonId
        [pokemonId]="pokemonId">
        {{pokemonId}}
    </p>`
})
class DummyComponent {
    public pokemonId: number = 7
    constructor() {}
}

describe('PokemonIdDirective', () => {

    let fixture: ComponentFixture<DummyComponent>;
    let component: DummyComponent;
    let directive: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DummyComponent, PokemonIdDirective],
            imports: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DummyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        directive = fixture.debugElement.query(By.directive(PokemonIdDirective));
        });
        
    it('should create an dummy component instance', () => {
        expect(component).toBeTruthy();
    });

    it('should create an directive instance', () => {
        expect(directive).toBeTruthy();
    });

    it('input directive 7, should return 0007', () => {
        const p = fixture.debugElement.query(By.css('#pokemonNumber'));

        expect(p.nativeElement.textContent).toEqual('N: 0007')
    })

  });
