import { Component, OnInit } from '@angular/core';

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
    shotefPlus: 60,
    daysOfPAymentDelay: 30,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  },{
    publisherName:'שלג הנדסה',
    shotefPlus: 60,
    daysOfPAymentDelay: 30,
    comment:'החברה תמיד מאחרת בתשלומים שלה ממולץ לעלות להם את המחיר על העבודה עקב האיחרוים בתשלומים'
  }]
  columnsToDisplay = ['שם מפרסם הדוח','שוטף פלוס','יימי איחור אחרי תקופת שוטף פלוס','הערה']
  constructor() { }

  ngOnInit() {
  }

}
