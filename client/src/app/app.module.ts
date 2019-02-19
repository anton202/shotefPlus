import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SubmitDelayComponent } from './submit-delay/submit-delay.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SearchBusinessComponent } from './search-business/search-business.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserAreaComponent } from './user-area/user-area.component';


@NgModule({
  declarations: [
    AppComponent,
    SubmitDelayComponent,
    SignInComponent,
    SearchBusinessComponent,
    SearchResultsComponent,
    UserAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
