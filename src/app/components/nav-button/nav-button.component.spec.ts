import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NavButtonComponent } from './nav-button.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  template: ''
})
class DummyComponent {}

describe('NavButtonComponent', () => {
  let component: NavButtonComponent;
  let fixture: ComponentFixture<NavButtonComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavButtonComponent,
        DummyComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'year/:year/month/:month', component: DummyComponent}
        ])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavButtonComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup proper direction', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.icon-left-open'))).toBeTruthy();
    expect(el.query(By.css('.icon-right-open'))).toBe(null);

    component.flip = true;
    fixture.detectChanges();
    expect(el.query(By.css('.icon-right-open'))).toBeTruthy();
    expect(el.query(By.css('.icon-left-open'))).toBe(null);

    component.flip = false;
    fixture.detectChanges();
    expect(el.query(By.css('.icon-left-open'))).toBeTruthy();
    expect(el.query(By.css('.icon-right-open'))).toBe(null);
  });

  it('should navigate to given link', async(inject([Router, Location], (router: Router, location: Location) => {
    component.navLink = '/year/2019/month/7';
    fixture.detectChanges();
    el.query(By.css('.nav-button')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/year/2019/month/7');
    });
  })));

});
