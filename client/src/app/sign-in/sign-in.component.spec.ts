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
               if(loginValues.password === ''){
                   observer.error(false)
               }
           }) 
        }
    }

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[SignInComponent, StatusMessageComponent],
            imports: [MaterialModule, FormsModule],
            providers:[{provide:SignInService, useValue:signInServiceStub},{provide:MatDialogRef, useValue:{},MatDialog}]
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
            const loginValues = {
                email:'a.kluge202@gmail.com',
                password:'anton202'
            }

            component.onSignIn(loginValues)
            fixture.detectChanges()
            const statusMessageComponent = rootElement.query(By.css('app-status-message'))
            expect(statusMessageComponent.nativeElement.innerText).toContain('התחברתה בהצלחה')
        }))

        it('should dispaly error message if not successfully loged in',()=>{
            const loginValues = {
                email:'a.kluge202@gmail.com',
                password:''
            }

            component.onSignIn(loginValues);
            fixture.detectChanges();
            const statusMessageComponent = rootElement.query(By.css('app-status-message'))
            expect(statusMessageComponent.nativeElement.innerText).toContain('ההתחברות נכשלה, נסה שוב או פנה למפתח האתר')
        })
    })
})