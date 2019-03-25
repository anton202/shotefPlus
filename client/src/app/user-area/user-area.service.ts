import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material';
import { ConfirmActionComponent } from '../reusable-components/confirm-action/confirm-action.component';

@Injectable({
    providedIn: 'root'
})
export class UserAreaService {
    apiUrl = environment.apiUrl;
    token = localStorage.getItem('token')
    headers = new HttpHeaders().set('Authorization',this.token);
    proccesingSpinner = false;
    successMessage = 'הפעולה בוצע בהצלחה.';
    errorMessage = 'משהו השתבש, נסה שוב או פנה למפתח האתר.';
    statusMessage;
    isReportsFetched;
    isReportSetManipulated;
    records = [{ name: 'בתי זיקוק לנפט בעמ', records: [{ shotefPlus: 30, delay: 60, comment: 'פעם אחת לא קיבלתי את התשלום מהחברה הזאת בזמן', createdAt: '20/3/2019', _id: '1543hnxsjo45' }] }];
    constructor(private http: HttpClient, private dailog: MatDialog) { }

    confirmAction(text){
       const dialogRef = this.dailog.open(ConfirmActionComponent,{data:{text}});
       return dialogRef.afterClosed()
    }

    changeReportSet(actionType,reportId,record,index){
        this.proccesingSpinner = true;
        setTimeout(()=>{
            this[actionType](reportId,record)
            .subscribe(
                ()=> {
                    this.proccesingSpinner = false
                    this.isReportSetManipulated = 'success';
                    this.statusMessage = this.successMessage;
                    setTimeout(()=>{
                        if(actionType = 'deleteReport'){
                            this.records.splice(index,1)
                        }
                        this.isReportSetManipulated = null
                    },2500)
                },
                error => {
                    this.proccesingSpinner = false;
                    this.isReportSetManipulated = 'fail';
                    this.statusMessage = this.errorMessage;
                    setTimeout(()=>this.isReportSetManipulated = null,3500)
                }
                )
        },3000)
        
    }

    getRecords(){
         this.http.get(this.apiUrl,{headers: this.headers})
            .subscribe(()=>console.log('success'),error => {this.isReportsFetched = 'fail';this.statusMessage = this.errorMessage})
    }
   
    deleteReport(reportId){
        return this.http.delete(`${this.apiUrl}/${reportId}`,{headers: this.headers})
    }

    saveChanges(reportId,report){
       return this.http.put(`${this.apiUrl}/${reportId}`,report)
    }
}