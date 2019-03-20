import { Component, OnInit } from '@angular/core';
import { UserAreaService } from './user-area.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnInit {
  errorMessage;
  records;
  
  constructor(private userAreaService: UserAreaService) { }

  ngOnInit() {
    // this.userAreaService.getRecords()
    //   .subscribe(
    //     records => this.records = records,
    //     ()=> this.errorMessage = "משהו השתבש נסה לטעון את הדף מחדש" 
    //     )
    this.userAreaService.getRecords();
    this.records = this.userAreaService.records
  }

  onButtonClick(reportId,text,actionType,report,reportIndex) {
    this.userAreaService.confirmAction(text)
      .subscribe((actionConfirmed) => {
        if (actionConfirmed) {
          this.userAreaService.changeReportSet(actionType,reportId,report,reportIndex)
        }
      })
  }

}
