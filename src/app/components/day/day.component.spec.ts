import { DayComponent } from './day.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DateFormatPipe } from '../../date-format.pipe';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { IdGenService } from '../../id-gen.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { By } from '@angular/platform-browser';

class MockActivatedRoute {
  snapshot = {
    params: {
      month: '7'
    }
  };
}

class MockStore {
  pipe(): Observable<Task[]> {
    return of([
      {id: 'wlxqh9fm0ynyzfma', date: '7-11-2019', text: 'Taks 1'},
      {id: 'ykcxqkml3cx2s75s', date: '7-11-2019', text: 'Task 2'}
    ]);
  }
}

describe('DayComponent test', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display date', () => {
    component.date = 'Thu Jul 04 2019 00:00:00 GMT+0300';
    fixture.detectChanges();
    expect(el.query(By.css('.cell-date')).nativeElement.textContent).toContain('4');
  });

  it('should correct set inactive class', () => {
    component.date = 'Sat Jun 04 2019 00:00:00 GMT+0300';
    fixture.detectChanges();
    expect(component.setIsInactive()).toBe(true);
    expect(el.query(By.css('.cell')).classes['cell--inactive']).toBeTruthy();

    component.date = 'Thu Jul 04 2019 00:00:00 GMT+0300';
    fixture.detectChanges();
    expect(component.setIsInactive()).toBe(false);
    expect(el.query(By.css('.cell')).classes['cell--inactive']).toBeFalsy();

    component.date = 'Sat Aug 03 2019 00:00:00 GMT+0300';
    fixture.detectChanges();
    expect(component.setIsInactive()).toBe(true);
    expect(el.query(By.css('.cell')).classes['cell--inactive']).toBeTruthy();
  });

  it('should display list of related tasks', () => {
    component.ngOnInit();
    expect(el.queryAll(By.css('.tasks .task')).length).toEqual(2);
  });

  it('should switch to edit mode and back', () => {
    component.date = 'Sat Jun 04 2019 00:00:00 GMT+0300';
    component.ngOnInit();
    el.query(By.css('.cell')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(el.query(By.css('.edit-popup')).nativeElement).toBeTruthy();
  });

  it('edit popup should appear on proper side depends on date', () => {
    component.date = 'Mon Jul 01 2019 00:00:00 GMT+0300';
    el.query(By.css('.cell')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(el.query(By.css('.edit-popup')).nativeElement).toBeTruthy();
    expect(el.query(By.css('.edit-popup')).classes['edit-popup--left']).toBeFalsy();

    component.date = 'Fri Jul 05 2019 00:00:00 GMT+0300';
    fixture.detectChanges();
    expect(el.query(By.css('.edit-popup')).classes['edit-popup--left']).toBeTruthy();
  });

  it('edit popup should contain tasks for current day', () => {
    component.date = 'Mon Jul 01 2019 00:00:00 GMT+0300';
    el.query(By.css('.cell')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(el.queryAll(By.css('.edit-popup .task')).length).toEqual(2);
  });

  it('should save new task', () => {
    component.date = 'Mon Jul 01 2019 00:00:00 GMT+0300';
    el.query(By.css('.cell')).triggerEventHandler('click', null);
    fixture.detectChanges();

    spyOn(component, 'save');

    el.query(By.css('.input')).nativeElement.value = 'New task';
    el.query(By.css('.input')).nativeElement.dispatchEvent(new KeyboardEvent('keydown', {ctrlKey: true, key: 'Enter'}));
    fixture.detectChanges();
    expect(component.save).toHaveBeenCalled();
  });
});
