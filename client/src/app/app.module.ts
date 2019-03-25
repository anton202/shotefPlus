import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SubmitDelayComponent } from './submit-delay/submit-delay.component';
import { SearchBusinessComponent } from './search-business/search-business.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { StatusMessageComponent } from './reusable-components/status-message/status-message.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from "./sign-in/sign-in.component";
import { UserAreaComponent } from "./user-area/user-area.component";
import { ConfirmActionComponent } from './reusable-components/confirm-action/confirm-action.component';
import { ShortenCommentPipe } from './search-results/shortenComment.pipe'


@NgModule({
  declarations: [
    AppComponent,
    SubmitDelayComponent,
    SearchBusinessComponent,
    SearchResultsComponent,
    StatusMessageComponent,
    SignUpComponent,
    SignInComponent,
    UserAreaComponent,
    ConfirmActionComponent,
    ShortenCommentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SignUpComponent, SignInComponent, UserAreaComponent, ConfirmActionComponent]
})
export class AppModule { }
