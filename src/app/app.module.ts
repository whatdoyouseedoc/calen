import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './components/month/month.component';
import { DateFormatPipe } from './date-format.pipe';
import { TaskComponent } from './components/task/task.component';
import { DayComponent } from './components/day/day.component';
import { StoreModule } from '@ngrx/store';
import { TaskReducer } from './store/reducers/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './store/effects/tasks.effects';
import { NavButtonComponent } from './components/nav-button/nav-button.component';

export const appRoutes: Routes = [
  {path: 'year/:year/month/:month', component: MainComponent},
  {path: '', component: MainComponent},
  {path: '**', component: MainComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MonthComponent,
    DateFormatPipe,
    TaskComponent,
    DayComponent,
    NavButtonComponent,
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
export class AppModule {
}
