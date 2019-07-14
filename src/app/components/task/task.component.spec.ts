import { TaskComponent } from './task.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from '../../models/task.model';
import { DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

class MockStore {

}

describe('Test task component', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Store, useClass: MockStore}
      ],
      declarations: [TaskComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task text', () => {
    const task: Task = {text: 'Sample text', id: '1', date: '1-1-2019'};
    component.task = task;
    fixture.detectChanges();
    expect(el.query(By.css('.text')).nativeElement.textContent).toContain('Sample text');
  });

  it('should display delete button', () => {
    expect(el.query(By.css('.delete'))).toBe(null);
    component.showDelete = true;
    fixture.detectChanges();
    expect(el.query(By.css('.delete'))).toBeTruthy();
    component.showDelete = false;
    fixture.detectChanges();
    expect(el.query(By.css('.delete'))).toBe(null);
  });
});
