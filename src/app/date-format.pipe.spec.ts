import { DateFormatPipe } from './date-format.pipe';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('DateFormatPipe isolate test', () => {
  const pipe = new DateFormatPipe();

  it('should transform date string to day number', () => {
    expect(pipe.transform('Sun Jul 07 2019 00:00:00 GMT+0300', 'DAY_NUMBER')).toBe('7');
    expect(pipe.transform('Tue Jul 09 2019 00:00:00 GMT+0300', 'DAY_NUMBER')).toBe('9');
    expect(pipe.transform('Fri Aug 09 2019 00:00:00 GMT+0300', 'DAY_NUMBER')).toBe('9');
  });
});

@Component({
  template: `
    <div class="date-formatted">{{date | dateFormat:'DAY_NUMBER'}}</div>
    <div class="date-same">{{date | dateFormat}}</div>
  `
})
class DummyComponent {
  date = 'Sun Jul 07 2019 00:00:00 GMT+0300';
}

describe('DateFormatPipe shallow test', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DummyComponent,
        DateFormatPipe
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should format date string to day number', () => {
    expect(el.query(By.css('.date-formatted')).nativeElement.textContent).toContain('7');

    component.date = 'Tue Jul 09 2019 00:00:00 GMT+0300';
    fixture.detectChanges();
    expect(el.query(By.css('.date-formatted')).nativeElement.textContent).toContain('9');
  });

  it('should return default same value if format was not set', () => {
    expect(el.query(By.css('.date-same')).nativeElement.textContent).toContain(component.date);

    component.date = 'Tue Jul 09 2019 00:00:00 GMT+0300';
    fixture.detectChanges();
    expect(el.query(By.css('.date-same')).nativeElement.textContent).toContain(component.date);
  });
});
