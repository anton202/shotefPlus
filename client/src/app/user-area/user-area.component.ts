import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserAreaService } from './user-area.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAreaComponent implements OnInit {
  statusMessage: string;
  records: Array<{}>;
  isProcessing: boolean = false;
  messageType: string;

  constructor(private userAreaService: UserAreaService) { }

  ngOnInit() {
    this.userAreaService.getRecords();
    this.records = this.userAreaService.records
  }

  public saveChanges(report: Form, reportId: string): void {
    console.log(report)
    this.isProcessing = true
    this.userAreaService.saveChanges(reportId, report)
      .subscribe(() => {
        this.handelResponse('השינויים נשמרו בהצלחה.', 'success')
      },
        error => {
          this.handelResponse('משהו השתבש..., נסה שוב או פנה למפתח האתר.', 'fail')
        }
      )
  }

  public deleteReport(reportId: string): void {
    console.log(reportId)
    this.userAreaService.deleteReport(reportId)
      .subscribe(() => {
        this.handelResponse('הדיווח נמחק בהצלחה.', 'success')
      },
        error => {
          this.handelResponse('משהו השתבש...,נסה שוב או פנה לפתח האתר.', 'fail')
        }
      )
  }

  private handelResponse(message: string, messageType): void {
    this.isProcessing = false;
    this.statusMessage = message;
    this.messageType = messageType;
    setTimeout(() => {
      this.messageType = '';
      this.statusMessage = '';
    }, 3000)
  }


}
