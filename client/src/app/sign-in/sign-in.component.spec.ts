import { DebugElement } from '@angular/core';    
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
 import { SignInService } from './sign-in.service';
 import { SignInComponent } from './sign-in.component';
 import '../material-theme.scss'
import { Observable} from 'rxjs';
import { StatusMessageComponent } from '../shared/status-message/status-message.component';

describe('sign-in component test',()=>{
    let fixture: ComponentFixture<SignInComponent>;
    let component: SignInComponent;
    let rootElement: DebugElement

    const signInServiceStub = {
        login(loginValues){
           return new Observable((observer)=>{
               observer.next(true)
               if(loginValues.password === false){
                   observer.error(false)
               }
           }) 
        }
    }

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[SignInComponent, StatusMessageComponent],
            imports: [MaterialModule, FormsModule, ReactiveFormsModule],
            providers:[{provide:SignInService, useValue:signInServiceStub},{provide:MatDialogRef, useValue:{}},MatDialog]
        })

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {entryComponents:[StatusMessageComponent]}
        })
    })

    beforeEach(()=>{
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        rootElement = fixture.debugElement;
    })

    describe('signing in',()=>{
        it('should display successfully loged in',fakeAsync(()=>{
           component.signInForm.controls['email'].setValue('a.kluge@gmail.com');
           component.signInForm.controls['password'].setValue('123455');

            component.onSignIn()
            fixture.detectChanges()
            const statusMessageComponent = rootElement.query(By.css('app-status-message'))
            expect(statusMessageComponent.nativeElement.innerText).toContain('התחברתה בהצלחה')
        }))

        it('should dispaly error message if not successfully loged in',()=>{
            component.signInForm.controls['email'].setValue('a.kluge@gmail.com');
            component.signInForm.controls['password'].setValue(false);
            component.onSignIn();
            fixture.detectChanges();
            const statusMessageComponent = rootElement.query(By.css('app-status-message'))
            expect(statusMessageComponent.nativeElement.innerText).toContain('ההתחברות נכשלה, נסה שוב או פנה למפתח האתר')
        })
    })

    describe('form validity',()=>{
        it('from shoudl be invalid if empty',()=>{
            expect(component.signInForm.valid).toBeFalsy()
        })

        it('email input should be invalid if empty',()=>{
            expect(component.signInForm.controls['email'].valid).toBeFalsy()
        })

        it('passworn input should be invallid if empty',()=>{
            expect(component.signInForm.controls['password'].valid).toBeFalsy()
        })
    })
})