import { DebugElement } from '@angular/core';   
import { ComponentFixture, fakeAsync, TestBed, tick } from
 '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from
 '@angular/platform-browser-dynamic/testing';
import { FormsModule } from '@angular/forms';   
import { MaterialModule } from '../material.module';
import { SignUpService } from './sign-up.service';
import { MatDialogRef } from '@angular/material';
import { SignUpComponent } from './sign-up.component';
import { StatusMessageComponent } from '../shared/status-message/status-message.component';
import '../material-theme.scss'

