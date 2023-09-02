import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoBackComponent } from './go-back.component';
import { routesMock } from 'src/app/modules/routing/routing.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';

describe('GoBackComponent', () => {
  let component: GoBackComponent;
  let fixture: ComponentFixture<GoBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoBackComponent],
      imports:[
        SharedModule,
        RouterTestingModule.withRoutes(routesMock)
      ]
    });
    fixture = TestBed.createComponent(GoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
