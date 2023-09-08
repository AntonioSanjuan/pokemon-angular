import { Component, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PokemonTypePillDirective } from './pokemon-type-pill.directive';

function rgbToHex(rgb: string) {
    console.log("rgb", rgb)
    // Verificar si el valor de entrada tiene el formato correcto
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    
    if (!match) {
      throw new Error('El valor proporcionado no tiene el formato correcto (ejemplo: "rgb(0, 0, 0)").');
    }
    
    // Obtener los valores de los componentes de color
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    // Convertir los componentes de color a su representación hexadecimal
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    return hex;
  }

@Component({
    template: `<div>
        <p appPokemonTypePill [typeName]="typeName">
            test
        </p>
    </div>`
})
class DummyComponent {
    public typeName = "grass";
    constructor() {}
}

describe('PokemonIdDirective', () => {
    let fixture: ComponentFixture<DummyComponent>;
    let component: DummyComponent;
    let directive: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DummyComponent, PokemonTypePillDirective],
            imports: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DummyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        directive = fixture.debugElement.query(By.directive(PokemonTypePillDirective));
        });
        
    it('should create an dummy component instance', () => {
        expect(component).toBeTruthy();
    });

    it('should create an directive instance', () => {
        expect(directive).toBeTruthy();
    });

    it('grass type should set grass styles', () => {
        component.typeName = "grass";
        fixture.detectChanges();

        expect(rgbToHex(directive.styles['backgroundColor'] as string)).toEqual('#9bcc50');
        expect(rgbToHex(directive.styles['color'] as string)).toEqual('#000000');
    });

    it('fire type should set fire styles', () => {
        component.typeName = "fire";
        fixture.detectChanges();

        expect(rgbToHex(directive.styles['backgroundColor'] as string)).toEqual("#fd7d24");
        expect(rgbToHex(directive.styles['color'] as string)).toEqual('#ffffff');
    });
});
