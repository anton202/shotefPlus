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
import { Observable } from 'rxjs';

describe('sign-up component', () => {
    let fixture: ComponentFixture<SignUpComponent>;
    let component: SignUpComponent;
    let rootElement: DebugElement;

    const signUpServiceStub = {
        registerAccount(registretionValues) {
            return new Observable((observer) => {
                observer.next(true);
                if (!registretionValues.password) {
                    observer.error(false)
                }
            })
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SignUpComponent, StatusMessageComponent],
            imports: [MaterialModule, FormsModule],
            providers: [{ provide: SignUpService, use: signUpServiceStub }, { provide: MatDialogRef, use: {} }]
        })

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: { entryComponents: [StatusMessageComponent] }
        })
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        rootElement = fixture.debugElement
    })

    describe('on sign-up',()=>{
        it('shou')
    })
})