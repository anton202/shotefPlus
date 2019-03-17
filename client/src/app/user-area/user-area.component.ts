import { Component, OnInit } from '@angular/core';
import { UserAreaService } from './user-area.service';
import { MatDialog } from '@angular/material';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnInit {
  records = [{name:'בתי זיקוק לנפט בעמ',records:[{shotefPlus:30,delay:60,comment:'פעם אחת לא קיבלתי את התשלום מהחברה הזאת בזמן',createdAt:'20/3/2019',_id:'1543hnxsjo45'}]}];
  errorMessage;
  proccesingSpinner = false;
  constructor(private userAreaService: UserAreaService, private dialog: MatDialog) { }

  ngOnInit() {
    // this.userAreaService.getRecords()
    //   .subscribe(
    //     records => this.records = records,
    //     ()=> this.errorMessage = "משהו השתבש נסה לטעון את הדף מחדש" 
    //     )
  }

  onDelete(reportId){
    const dailogRef = this.userAreaService.openConfirmationDialog('למחוק דיווח?')

    dailogRef.afterClosed().subscribe((deleteReport)=>{
      if(deleteReport){
      this.userAreaService.deleteReport(reportId)
        .subscribe(
          ()=> console.log('deleted'),
          error => console.log('erroe')
          )
        }
    })
  
  }

}
