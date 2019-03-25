import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserAreaService } from './user-area.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAreaComponent implements OnInit {
  errorMessage;
  records;
  
  constructor(private userAreaService: UserAreaService) { }

  ngOnInit() {
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
