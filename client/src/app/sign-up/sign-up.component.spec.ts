import { DebugElement, Component } from '@angular/core';    
import { ComponentFixture, fakeAsync, TestBed, tick } from
 '@angular/core/testing';    
import { By } from '@angular/platform-browser';    
import { NoopAnimationsModule } from
 '@angular/platform-browser/animations';    
import { BrowserDynamicTestingModule } from  
 '@angular/platform-browser-dynamic/testing';    
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
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
               if(loginValues.password === '123456'){
                   observer.error(false)
               }
           }) 
        }
    }

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[SignUpComponent, StatusMessageComponent],
            imports: [MaterialModule, FormsModule, ReactiveFormsModule],
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
        component.ngOnInit()
    })

    describe('signing up',()=>{
        it('should display successfully signed up',()=>{
            component.signUpForm.controls['email'].setValue('a.kluge@gmail.com');
            component.signUpForm.controls['password'].setValue('1234567');
            component.signUpForm.controls['employmentType'].setValue('freeLancer')
            component.signUpForm.controls['freeLancerId'].setValue('321332425')
           
            fixture.detectChanges()
            component.onSignUp()
            fixture.detectChanges()
            
            const statusMessageComponent = rootElement.query(By.css('app-status-message'))
            expect(statusMessageComponent.nativeElement.innerText).toContain('נרשמתה בהצלחה, מייל ישלך אליך ברגע שהמשתמש יאומת')
        })

        it('should dispaly error message if not successfully signed up',()=>{
            component.signUpForm.controls['email'].setValue('a.kluge@gmail.com');
            component.signUpForm.controls['password'].setValue('123456');
            component.signUpForm.controls['employmentType'].setValue('freeLancer')
            component.signUpForm.controls['freeLancerId'].setValue('321332425')

            fixture.detectChanges();
            component.onSignUp();
            fixture.detectChanges();

            const statusMessageComponent = rootElement.query(By.css('app-status-message'))
            expect(statusMessageComponent.nativeElement.innerText).toContain('משהו השתבש, נסה שוב או פנה לתמיכה טכנית')
        })
    })

    describe('sign up form validity',()=>{
        it('form should be invalid if empty',()=>{
            expect(component.signUpForm.valid).toBeFalsy()
        })

        it('email control should be invalid if email is not in standart form',()=>{
            component.signUpForm.controls['email'].setValue('testgmail');
            fixture.detectChanges()
            console.log(component.signUpForm)
            expect( component.signUpForm.controls['email'].valid).toBeFalsy()
        })
    })
})