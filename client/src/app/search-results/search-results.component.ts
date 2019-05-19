import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { SearchResultsService } from './search-results.service';
import { EvidenceComponent } from '../evidence/evidence.component';
import { data } from './data';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchResultsComponent implements OnInit {
  headerData = [{ name: 'בתי זיקוק בעמ', number: 51000043, shotefPlusAvrg: 90, avrgDaysOfDelay: 100 }];
  columnsToDisplay = ['שוטף פלוס', 'יימי איחור אחרי תקופת שוטף פלוס', 'הערה', 'הוכחות'];
  headerColumns = ['שם חברה', 'מספר חברה', 'ממוצע שוטף פלוס', 'ממוצע ימיי איחור'];
  dataSource = new MatTableDataSource(data);
  expandedElement: any
  companyRecords;
  searchStatus;
  statusMessage;

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private searchResultsService: SearchResultsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.searchResultsService.getCompanyRecords()
      .subscribe(companyRecords => {
        this.searchResultsService.showSppiner = false;
        this.companyRecords = companyRecords
      },
        error => {
          console.log('error')
          this.searchResultsService.showSppiner = false
          this.searchStatus = 'fail'
          this.statusMessage = 'משהו התשבש, נסה שוב או פנה למפתח האתר'
        })
  }

  openEvidence(evidence: Array<string>): void {
    this.dialog.open(EvidenceComponent, { 
      data: { evidence: evidence },
      panelClass:'evidence' 
    })
  }

// this function search the value typed in the input filed on the data object.
// so if the value exist on the data object, this data returns to the user.
  applyFilter(filterValue: string): void {
    console.log(typeof filterValue.trim().toLowerCase())

    this.dataSource.filter = filterValue.trim().toLowerCase().toString();
  }
}
