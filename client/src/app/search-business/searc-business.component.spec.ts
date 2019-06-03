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
import { Observable, Subject } from 'rxjs';

describe('search business component test',()=>{
    let fixture: ComponentFixture<SearchBusinessComponent>;
    let component: SearchBusinessComponent;
    let rootElement: DebugElement;

    const searchBusinessServiceStub = {
        requestCompanyNameFromApi(nameOrNumber){
            return new Observable((observer)=>{
                if(nameOrNumber === undefined){
                    observer.error(false)
                }
                observer.next({result:{records:[{'שם חברה':'שלג הנדסה בעמ'}]}});
            })
        }
    }

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[SearchBusinessComponent],
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
   

})


