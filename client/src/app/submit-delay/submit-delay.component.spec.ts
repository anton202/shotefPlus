import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from
    '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from
    '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from
    '@angular/platform-browser-dynamic/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module'
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { MatDialog, MatDialogRef } from '@angular/material';
import { SearchBusinessService } from '../search-business/search-business.service';
import { SubmitDelayService } from './submit-delay.service'
import { AppService } from '../app.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ReadImgService } from '../shared/services/readImg.service';
import { ValidatorsService } from '../shared/services/validators.service'
import { FileValidator } from '../../../node_modules/ngx-material-file-input'
import { SubmitDelayComponent } from './submit-delay.component';
import { StatusMessageComponent } from '../shared/status-message/status-message.component'
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


describe('Submit-Delay Component', () => {
    let fixture: ComponentFixture<SubmitDelayComponent>
    let component: SubmitDelayComponent;
    let rootElement: DebugElement;

    const submitDelayServiceStub = {
        submitDelayToApi(delayForm) {
            return new Observable((observer) => {
                observer.next(true)
                if (delayForm.shotef_plus == 90) {
                    observer.error(false)
                }
            })
        }
    }

    const appServiceStub = {
        isAuthenticated: true
    }

    const searchBusinessServiceStub = {
        requestCompanyNameFromApi(nameOrNumber) {
            return new Observable((observer) => {
                if (nameOrNumber === undefined) {
                    observer.error(false)
                }
                observer.next({ result: { records: [{ 'שם חברה': 'שלג הנדסה בעמ' }] } });
            })
        }
    }

    const readImgServiceStub = {
        readFile() {
            return new Observable((observer) => {
                observer.next(['encoded string'])
            })
        }
    }

    const validatorsServiceStub = {
        maxInputFiles() {
            return null
        },
        maxContentSize() {
            return null
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SubmitDelayComponent, StatusMessageComponent, SignInComponent],
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, MaterialFileInputModule],
            providers: [
                { provide: SubmitDelayService, useValue: submitDelayServiceStub },
                { provide: AppService, useValue: appServiceStub },
                { provide: SearchBusinessService, useValue: searchBusinessServiceStub },
                { provide: ReadImgService, useValue: readImgServiceStub },
                { provide: ValidatorsService, useValue: validatorsServiceStub },
                { provide: MatDialogRef, useValue: {} },
                MatDialog
            ]
        })
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmitDelayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        rootElement = fixture.debugElement;
    })


    describe('form validity', () => {
        it('form should be invalid if empty', () => {
            expect(component.submitDelayForm.valid).toBeFalsy()
        })

        it(' company name control should be invalid if name dose not exist', () => {
            let searchCompanyInput = component.submitDelayForm.controls['company_name']
            component.companyNameSuggestion = [{ 'שם חברה': 'בתי זיקוק לנפט' }]
            searchCompanyInput.setValue('שלג הנדסה בעמ');

            expect(searchCompanyInput.valid).toBeFalsy()
        })

        it('shotef plus input should be invalid if empty', () => {
            expect(component.submitDelayForm.controls['shotef_plus'].valid).toBeFalsy()
        })

        it('days of delya input should be invaild if empty', () => {
            expect(component.submitDelayForm.controls['days_of_delay'].valid).toBeFalsy()
        })

        // need to test file input validators
    })

    describe('form submition', () => {
        it('should display successfuly submited message', () => {
            component.submitDelayForm.controls['company_name'].setValue('שלג הנדסה בעמ');
            component.submitDelayForm.controls['shotef_plus'].setValue('60');
            component.submitDelayForm.controls['days_of_delay'].setValue('30');

            component.submitDelay();
            fixture.detectChanges();
            const message = rootElement.query(By.css('app-status-message'))
            expect(message.nativeElement.innerText).toContain('הדוח דווח בהצלחה')
        })

        it('should dispaly error messsage', () => {
            component.submitDelayForm.controls['company_name'].setValue('שלג הנדסה בעמ');
            component.submitDelayForm.controls['shotef_plus'].setValue('90');
            component.submitDelayForm.controls['days_of_delay'].setValue('30');

            component.submitDelay();
            fixture.detectChanges();
            const message = rootElement.query(By.css('app-status-message'))
            expect(message.nativeElement.innerText).toContain('משהו השתבש בעת הדיווח, נסה שוב או פנה לתמיכה טכנית')
        })

    })

    describe('upload evidence', () => {
        it('should encode img  ', fakeAsync(() => {
            component.submitDelayForm.controls['evidence'].clearValidators();
            component.submitDelayForm.controls['evidence'].setValue('test')
            component.onChange();
            tick(10000);
            fixture.detectChanges();
            expect(component.submitDelayForm.value.evidence[0]).toContain('encoded string')

        }))
    })

    describe('search for company name', () => {
        it('should call searchCompanyName', fakeAsync(() => {
            spyOn(component,'searchForCompanyName');
            const inputName = rootElement.query(By.css('.searchName'));
            inputName.triggerEventHandler('keypress',component.searchForCompanyName);
            expect(component.searchForCompanyName).toHaveBeenCalled()
        }))

        it('should populate companyNameSuggestion property with suggested names if exist',fakeAsync(()=>{
            component.submitDelayForm.controls['company_name'].setValue('שלג');
            component.searchForCompanyName();
            tick(10000);
            expect(component.companyNameSuggestion[0]).toEqual({ 'שם חברה': 'שלג הנדסה בעמ' })

        }))

        
    })

})