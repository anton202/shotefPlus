import { Component, OnInit } from '@angular/core';
import { UserAreaService } from './user-area.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnInit {
  records = [{ name: 'בתי זיקוק לנפט בעמ', records: [{ shotefPlus: 30, delay: 60, comment: 'פעם אחת לא קיבלתי את התשלום מהחברה הזאת בזמן', createdAt: '20/3/2019', _id: '1543hnxsjo45' }] }];
  errorMessage;
  
  constructor(private userAreaService: UserAreaService) { }

  ngOnInit() {
    // this.userAreaService.getRecords()
    //   .subscribe(
    //     records => this.records = records,
    //     ()=> this.errorMessage = "משהו השתבש נסה לטעון את הדף מחדש" 
    //     )
  }

  onButtonClick(reportId,text,actionType,report) {
    this.userAreaService.confirmAction(text)
      .subscribe((actionConfirmed) => {
        if (actionConfirmed) {
          this.userAreaService.changeReportSet(actionType,reportId,report)
        }
      })
  }

}
