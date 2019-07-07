import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {Routes, RouterModule} from '@angular/router';
import { DaysListComponent } from './days-list/days-list.component';
import { DateFormatPipe } from './date-format.pipe';
import { TaskComponent } from './task/task.component';
import { DayListItemComponent } from './day-list-item/day-list-item.component';
import { StoreModule } from '@ngrx/store';
import { TaskReducer } from './store/reducers/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './store/effects/tasks.effects';

const appRoutes: Routes = [
  {path: 'year/:year/month/:month', component: HeaderComponent},
  {path: '', component: HeaderComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DaysListComponent,
    DateFormatPipe,
    TaskComponent,
    DayListItemComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({
      tasks: TaskReducer
    }),
    EffectsModule.forRoot([TasksEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
