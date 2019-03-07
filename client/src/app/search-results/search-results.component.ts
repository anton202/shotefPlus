import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
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
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
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
  //paginattor length should be the length of the array that is fetched from the server with the compnay delays.
  //paginatorLength = 100;
  pageSize = 10;
  dataSource =  new MatTableDataSource(this.dummyData);

  @ViewChild(MatPaginator) paginator: MatPaginator
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
