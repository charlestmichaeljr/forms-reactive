import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ReactiveExerciseComponent } from './reactive-exercise/reactive-exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveExerciseComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [ReactiveExerciseComponent]
})
export class AppModule { }
