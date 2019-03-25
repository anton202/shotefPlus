import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SearchResultsService } from './search-results.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})
export class SearchResultsComponent implements OnInit {
   dummyData = [{
    publisherName:'שלג הנדסה',
    shotefPlus: 60,
    daysOfPAymentDelay: 30,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },{
    publisherName:'שלג הנדסה',
    shotefPlus: 40,
    daysOfPAymentDelay: 70,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },
  {
    publisherName:'שלג הנדסה',
    shotefPlus: 30,
    daysOfPAymentDelay: 20,
    comment:`החברה לא שילמה לי את הכסף בזמן כרגיל....
    כל הפעמים שעבדתי איתם לא קיבלתי את הכסף בזמן
    החברה לא שילמה לי את הכסף בזמן כרגיל....
כל הפעמים שעבדתי איתם ל `
  },
  {
    publisherName:'שלג הנדסה',
    shotefPlus: 50,
    daysOfPAymentDelay: 88,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },{
    publisherName:'שלג הנדסה',
    shotefPlus: 60,
    daysOfPAymentDelay: 30,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },
  {
    publisherName:'שלג הנדסה',
    shotefPlus: 120,
    daysOfPAymentDelay: 15,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },
  {
    publisherName:'שלג הנדסה',
    shotefPlus: 90,
    daysOfPAymentDelay: 100,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },{
    publisherName:'שלג הנדסה',
    shotefPlus: 100,
    daysOfPAymentDelay: 65,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },
  {
    publisherName:'שלג הנדסה',
    shotefPlus: 33,
    daysOfPAymentDelay: 15,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },
  {
    publisherName:'שלג הנדסה',
    shotefPlus: 40,
    daysOfPAymentDelay: 10,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  }
]
  headerData = [{name:'בתי זיקוק בעמ',number:51000043,shotefPlusAvrg:90,avrgDaysOfDelay:100}];
  columnsToDisplay = ['שם מפרסם הדוח','שוטף פלוס','יימי איחור אחרי תקופת שוטף פלוס','הערה'];
  headerColumns = ['שם חברה','מספר חברה','ממוצע שוטף פלוס','ממוצע ימיי איחור'];
  dataSource =  new MatTableDataSource(this.dummyData);
  expandedElement:any
  companyRecords;
  searchStatus;
  statusMessage;

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(public searchResultsService: SearchResultsService) { }

  ngOnInit() {
   this.dataSource.paginator = this.paginator;
   
   this.searchResultsService.getCompanyRecords()
        .subscribe(companyRecords => {
          this.searchResultsService.showSppiner = false;
          this.companyRecords = companyRecords
        },
        error =>{
          console.log('error')
          this.searchResultsService.showSppiner = false
          this.searchStatus = 'fail'
          this.statusMessage = 'משהו התשבש, נסה שוב או פנה למפתח האתר'
        } )
  }

}
