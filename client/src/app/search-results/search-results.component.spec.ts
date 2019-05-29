import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from
    '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from
    '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from
    '@angular/platform-browser-dynamic/testing';
import { SearchBusinessService } from '../search-business/search-business.service'
import { EvidenceComponent } from '../evidence/evidence.component';
import { data } from './data';
import { SearchResultsComponent } from './search-results.component';
import { MatPaginator, MatTableDataSource, MatDialog, MatTableModule } from '@angular/material';
import { MaterialModule } from '../material.module';
import { Observable, Subject } from 'rxjs';
import { ShortenCommentPipe } from './shortenComment.pipe'

describe('search result component', () => {
    let fixture: ComponentFixture<SearchResultsComponent>;
    let component: SearchResultsComponent;
    let rootElement: DebugElement;

    const searchBusinessServiceStub = {
        reports: new Subject()
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SearchResultsComponent, 
                EvidenceComponent, ShortenCommentPipe, ],
            imports: [MaterialModule,MatTableModule],
            providers: [{
                provide: SearchBusinessService,
                useValue: searchBusinessServiceStub
            },
                MatDialog,
            ]
        })
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        rootElement = fixture.debugElement;
    })

    describe('table', () => {
        it("should display 11 table rows", () => {
            fixture.detectChanges();
            const table = rootElement.nativeElement.querySelectorAll('tbody tr')
            expect(table.length).toBe(11)
        })

        it('should display filterd data',()=>{
            fixture.detectChanges();
            component.applyFilter('100')
            fixture.detectChanges();
            const table = rootElement.nativeElement.querySelectorAll('tbody tr')
            expect(table.length).toBe(3)
        })

        it('second table should be empty if no company reports exist',()=>{
            fixture.detectChanges();
            component.dataSource = new MatTableDataSource([]);
            fixture.detectChanges();
            const table = rootElement.nativeElement.querySelectorAll('tbody tr')
            expect(table.length).toBe(1)
        })
    })

})

