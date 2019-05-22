import { DebugElement } from '@angular/core';    
import { ComponentFixture, fakeAsync, TestBed, tick } from
 '@angular/core/testing';    
import { By } from '@angular/platform-browser';    
import { NoopAnimationsModule } from
 '@angular/platform-browser/animations';    
import { BrowserDynamicTestingModule } from  
 '@angular/platform-browser-dynamic/testing';    
 import { FormsModule } from '@angular/forms';  
 import { MaterialModule } from '../material.module';
 import { MatDialogRef, MatDialog } from '@angular/material';
 import { SignUpService } from './sign-up.service'
 import { SignUpComponent } from './sign-up.component';
 import '../material-theme.scss'
import { Observable} from 'rxjs';
import { StatusMessageComponent } from '../shared/status-message/status-message.component';

describe('sign-up component test',()=>{
    let fixture: ComponentFixture<SignUpComponent>;
    let component: SignUpComponent;
    let rootElement: DebugElement

    const signUpServiceStub = {
        registerAccount(loginValues){
           return new Observable((observer)=>{
               observer.next(true)
               if(loginValues.password === ''){
                   observer.error(false)
               }
           }) 
        }
    }

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[SignUpComponent, StatusMessageComponent],
            imports: [MaterialModule, FormsModule],
            providers:[{provide:SignUpService,useValue:signUpServiceStub},{provide:MatDialogRef, useValue:{}},MatDialog]
        })

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {entryComponents:[StatusMessageComponent]}
        })
    })

    beforeEach(()=>{
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        rootElement = fixture.debugElement;
    })

    describe('signing up',()=>{
        it('should display successfully loged in',fakeAsync(()=>{
            const registration = {
                email:'a.kluge202@gmail.com',
                password:'anton202',
                freeLanceId: 321332425
            }

            component.onSignUp(registration)
            fixture.detectChanges()
            const statusMessageComponent = rootElement.query(By.css('app-status-message'))
            expect(statusMessageComponent.nativeElement.innerText).toContain('נרשמתה בהצלחה, מייל ישלך אליך ברגע שהמשתמש יאומת')
        }))

        it('should dispaly error message if not successfully loged in',()=>{
            const registration = {
                email:'a.kluge202@gmail.com',
                password:'',
                freeLanceId: 321332425
            }

            component.onSignUp(registration);
            fixture.detectChanges();
            const statusMessageComponent = rootElement.query(By.css('app-status-message'))
            expect(statusMessageComponent.nativeElement.innerText).toContain('משהו השתבש, נסה שוב או פנה למפתח האתר')
        })
    })
})