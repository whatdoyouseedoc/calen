import { MonthComponent } from './month.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DayComponent } from '../day/day.component';
import { DateFormatPipe } from '../../date-format.pipe';
import { TaskComponent } from '../task/task.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { IdGenService } from '../../id-gen.service';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';

const mockDaysList: string[] = ['Mon Jul 01 2019 00:00:00 GMT+0300', 'Tue Jul 02 2019 00:00:00 GMT+0300', 'Wed Jul 03 2019 00:00:00 GMT+0300', 'Thu Jul 04 2019 00:00:00 GMT+0300', 'Fri Jul 05 2019 00:00:00 GMT+0300', 'Sat Jul 06 2019 00:00:00 GMT+0300', 'Sun Jul 07 2019 00:00:00 GMT+0300', 'Mon Jul 08 2019 00:00:00 GMT+0300', 'Tue Jul 09 2019 00:00:00 GMT+0300', 'Wed Jul 10 2019 00:00:00 GMT+0300', 'Thu Jul 11 2019 00:00:00 GMT+0300', 'Fri Jul 12 2019 00:00:00 GMT+0300', 'Sat Jul 13 2019 00:00:00 GMT+0300', 'Sun Jul 14 2019 00:00:00 GMT+0300', 'Mon Jul 15 2019 00:00:00 GMT+0300', 'Tue Jul 16 2019 00:00:00 GMT+0300', 'Wed Jul 17 2019 00:00:00 GMT+0300', 'Thu Jul 18 2019 00:00:00 GMT+0300', 'Fri Jul 19 2019 00:00:00 GMT+0300', 'Sat Jul 20 2019 00:00:00 GMT+0300', 'Sun Jul 21 2019 00:00:00 GMT+0300', 'Mon Jul 22 2019 00:00:00 GMT+0300', 'Tue Jul 23 2019 00:00:00 GMT+0300', 'Wed Jul 24 2019 00:00:00 GMT+0300', 'Thu Jul 25 2019 00:00:00 GMT+0300', 'Fri Jul 26 2019 00:00:00 GMT+0300', 'Sat Jul 27 2019 00:00:00 GMT+0300', 'Sun Jul 28 2019 00:00:00 GMT+0300', 'Mon Jul 29 2019 00:00:00 GMT+0300', 'Tue Jul 30 2019 00:00:00 GMT+0300', 'Wed Jul 31 2019 00:00:00 GMT+0300', 'Thu Aug 01 2019 00:00:00 GMT+0300', 'Fri Aug 02 2019 00:00:00 GMT+0300', 'Sat Aug 03 2019 00:00:00 GMT+0300', 'Sun Aug 04 2019 00:00:00 GMT+0300'];

class MockStore {
  pipe(): Observable<Task[]> {
    return of([
      {id: 'wlxqh9fm0ynyzfma', date: '7-11-2019', text: 'Taks 1'},
      {id: 'ykcxqkml3cx2s75s', date: '7-11-2019', text: 'Task 2'}
    ]);
  }
}
class MockActivatedRoute {
  snapshot = {
    params: {
      month: '7'
    }
  };
}

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonthComponent,
        DayComponent,
        DateFormatPipe,
        TaskComponent
      ],
      imports: [
        CommonModule
      ],
      providers: [
        IdGenService,
        {provide: Store, useClass: MockStore},
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display days', () => {
    component.daysList = mockDaysList;
    fixture.detectChanges();
    expect(el.queryAll(By.css('.cell')).length).toEqual(mockDaysList.length);
  });
});
