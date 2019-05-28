import { DebugElement } from '@angular/core';    
import { ComponentFixture, fakeAsync, TestBed, tick } from
 '@angular/core/testing';    
import { By } from '@angular/platform-browser';    
import { NoopAnimationsModule } from
 '@angular/platform-browser/animations';    
import { BrowserDynamicTestingModule } from  
 '@angular/platform-browser-dynamic/testing';    
 import { SearchResultsService } from './search-results.service';
 import { EvidenceComponent } from '../evidence/evidence.component';
 import { data } from './data';
 import { SearchResultsComponent } from './search-results.component';
 import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

 describe('search result component',()=>{
     let fixture: ComponentFixture<SearchResultsComponent>;
     let component: SearchResultsComponent;
     let rootElement: DebugElement;

    const searchResultsService = {
        searchCompanyRecords(){
            return new Observable((observer)=>{
                
            })
        }
    }

     beforeEach(()=>{
         TestBed.configureTestingModule({

         })
     })
 })

