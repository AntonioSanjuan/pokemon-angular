import { Component, DebugElement } from '@angular/core'
import { SkeletonDirective } from './skeleton.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const sutWidth: string = '70px'

@Component({
    template: `<div><p appSkeleton [active]="appSkeletonActive" [width]="'70px'" [height]="'8px'"></p></div>`
})
class DummyComponent {
    public appSkeletonActive = false;
    constructor() {}
}

describe('SkeletonDirective', () => {

    let fixture: ComponentFixture<DummyComponent>;
    let component: DummyComponent;
    let directive: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DummyComponent, SkeletonDirective],
            imports: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DummyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        directive = fixture.debugElement.query(By.directive(SkeletonDirective));
        });
        
    it('should create an dummy component instance', () => {
        expect(component).toBeTruthy();
    });

    it('should create an directive instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should have skeleton if active is true', () => {
        component.appSkeletonActive = true;
        fixture.detectChanges();

        expect(directive.styles['width']).toEqual(sutWidth);
        expect(directive.styles['userSelect']).toEqual('none');
    });

    it('shouldnt have skeleton if active is false', () => {
        component.appSkeletonActive = false;
        fixture.detectChanges();

        expect(directive.styles['width']).not.toEqual(sutWidth);
        expect(directive.styles['userSelect']).not.toEqual('none');
    });
});
