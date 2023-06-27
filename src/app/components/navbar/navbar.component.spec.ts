import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { APP_ROUTES } from 'src/app/modules/routing/routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { routesMock } from 'src/app/modules/routing/routing.mock';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule.withRoutes(routesMock)]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to about if aboutLink is clicked', () => {
    const btn = fixture.debugElement.query(By.css('#aboutLink'));
    btn.nativeElement.click();

    fixture.detectChanges()
    expect(router.url).toBe(`/about`);
  });

  it('should navigate to home if homeLink is clicked', () => {
    const btn = fixture.debugElement.query(By.css('#homeLink'));
    btn.nativeElement.click();

    fixture.detectChanges()
    expect(router.url).toBe(`/home`);
  });


});
