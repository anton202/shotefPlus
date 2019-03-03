import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SubmitDelayComponent } from './submit-delay/submit-delay.component';
import { SearchBusinessComponent } from './search-business/search-business.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { SearchBusinessService } from './search-business/search-business.service';



@NgModule({
  declarations: [
    AppComponent,
    SubmitDelayComponent,
    SearchBusinessComponent,
    SearchResultsComponent,
    UserAreaComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
