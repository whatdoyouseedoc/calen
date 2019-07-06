import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayListItemComponent } from './day-list-item.component';

describe('DayListItemComponent', () => {
  let component: DayListItemComponent;
  let fixture: ComponentFixture<DayListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
