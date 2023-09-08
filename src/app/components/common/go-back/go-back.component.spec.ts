import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { GoBackComponent } from './go-back.component';
import { routesMock } from 'src/app/modules/routing/routing.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ActivatedRoute, Navigation, Router } from '@angular/router';

describe('GoBackComponent', () => {
  let component: GoBackComponent;
  let fixture: ComponentFixture<GoBackComponent>;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoBackComponent],
      imports:[
        SharedModule,
        RouterTestingModule.withRoutes(routesMock)
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(GoBackComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if doesnt exists previous navigation (!canGoBack), goBack button should navigate to ..', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true)
    const getCurrentNavigationSpy = jest.spyOn(router, "getCurrentNavigation").mockReturnValue(
      {
        previousNavigation: null
      } as Navigation 
    )

    component.goBack()
    
    expect(navigateSpy).toHaveBeenCalledWith(['..'], {relativeTo: {}})
  });

  it('if exists previous navigation (canGoBack), goBack button should previous location', () => {
    const locationSpy = jest.spyOn(location, 'back')
    const getCurrentNavigationSpy = jest.spyOn(router, "getCurrentNavigation").mockReturnValue(
      {
        previousNavigation: {} as Navigation
      } as Navigation 
    )
    fixture = TestBed.createComponent(GoBackComponent); // this is the trigger of constructor method
    component = fixture.componentInstance
    fixture.detectChanges()
    component.goBack()

    expect(locationSpy).toHaveBeenCalled()
  });
});
