import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SubmitDelayComponent } from './submit-delay/submit-delay.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchBusinessComponent } from './search-business/search-business.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    SubmitDelayComponent,
    SignInComponent,
    SignUpComponent,
    SearchBusinessComponent,
    SearchResultsComponent,
    UserAreaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
