import { DebugElement } from '@angular/core';   
import { ComponentFixture, fakeAsync, TestBed, tick } from
 '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from
 '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from
 '@angular/platform-browser-dynamic/testing';

import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';   
import { MaterialModule } from '../material.module';

import { SearchBusinessComponent } from './search-business.component';
import { SearchBusinessService } from './search-business.service';
import { StatusMessageComponent } from '../shared/status-message/status-message.component'
import { Observable, Subject } from 'rxjs';
import { async } from 'q';

describe('search business component test',()=>{
    let fixture: ComponentFixture<SearchBusinessComponent>;
    let component: SearchBusinessComponent;
    let rootElement: DebugElement;

    const searchBusinessServiceStub = {
        reports: new Subject(),
        requestCompanyNameFromApi(nameOrNumber){
            return new Observable((observer)=>{
                if(nameOrNumber === undefined){
                    observer.error(false)
                }
                observer.next({result:{records:[{'שם חברה':'שלג הנדסה בעמ'}]}});
            })
        },
        getCompnayReports(companyName){
            return new Observable((observer)=>{
                if(companyName === 'fail'){
                    return observer.error(false)
                }
                observer.next([{companyName:'test',shotefPlus:30,delay:60}])
            })
        }
    }

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[SearchBusinessComponent, StatusMessageComponent],
            imports:[MaterialModule,ReactiveFormsModule,FormsModule],
            providers: [{provide:SearchBusinessService, useValue:searchBusinessServiceStub}]
        })
    })

    beforeEach(()=>{
        fixture = TestBed.createComponent(SearchBusinessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        rootElement = fixture.debugElement;
    })

    describe('search compnay name in api',()=>{
        it('should fetch mathcing company names',()=>{
            component.searchForCompanyName();
            expect(component.companyNameSuggestion).toEqual([{'שם חברה':'שלג הנדסה בעמ'}])
        })

        // it('should call requestCompanyNameFromApi',fakeAsync(()=>{
        //     component.searchCompanyNameForm.controls['company_name'].setValue('שלג')
        //     let spy = spyOn(searchBusinessServiceStub,'');
            
        //     component.searchForCompanyName();
        //     tick(1000)
        //     fixture.detectChanges()
        //     expect(spy).toHaveBeenCalled()
        // }))
    })

   describe('form validity',()=>{
    it('form should be invalid if empty',()=>{
        expect(component.searchCompanyNameForm.valid).toBeFalsy()
    })

    it('search company input should be valid if company name exist in api',()=>{
        let searchCompanyInput = component.searchCompanyNameForm.controls['company_name']
        component.companyNameSuggestion = [{'שם חברה':'שלג הנדסה בעמ'}]
        searchCompanyInput.setValue('שלג הנדסה בעמ');
        
        expect(searchCompanyInput.valid).toBeTruthy()
    })

    it('search company input should be invalid if company name does not exist in api',()=>{
         let searchCompanyInput = component.searchCompanyNameForm.controls['company_name']
        component.companyNameSuggestion = [{'שם חברה':'בתי זיקוק לנפט'}]
        searchCompanyInput.setValue('שלג הנדסה בעמ');
        
        expect(searchCompanyInput.valid).toBeFalsy()
    })
   })
   
   describe('submit search',()=>{
       it('should submit search',fakeAsync(()=>{
           let spy = spyOn(searchBusinessServiceStub.reports,"next")
           component.onSearchSubmit()
           tick(10000)
          expect(spy).toHaveBeenCalledWith([{companyName:'test',shotefPlus:30,delay:60}])
       }))

       it('should display error message if search failed',fakeAsync(()=>{
        component.searchCompanyNameForm.controls['company_name'].setValue('fail')
        component.onSearchSubmit();
        fixture.detectChanges();
        const errorMessage = rootElement.query(By.css('app-status-message'))
        expect(errorMessage.nativeElement.innerText).toContain('משהו השתבש בחיפוש נסה שוב או פנה לתיכה טכנית')
       }))
})


})