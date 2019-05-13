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

  public confirmSaveChanges(report:Form, reportId:string):void{
    this.userAreaService.confirmAction('לשמור שינויים?')
    .subscribe(actinConfiremd =>{
      if(actinConfiremd){
        this.saveChanges(report,reportId)
      }
    })
  }

  public confirmDeleteReport(reportId:string):void{
    this.userAreaService.confirmAction('למחוק דיווח?')
    .subscribe(actinConfiremd =>{
      if(actinConfiremd){
        this.deleteReport(reportId)
      }
    })
  }

  private saveChanges(report: Form, reportId: string): void {
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

  private deleteReport(reportId: string): void {
    console.log(reportId)
    this.isProcessing = true;
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
