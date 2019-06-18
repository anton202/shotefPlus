import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserAreaService } from './user-area.service';
import { ReadImgService } from '../shared/services/readImg.service';
import { ValidatorsService } from '../shared/services/validators.service'
import { editReport } from '../shared/models/edit-report'
import { FileValidator } from '../../../node_modules/ngx-material-file-input'
import { data } from './data';
import { EvidenceComponent } from '../evidence/evidence.component';
import { ConfirmActionComponent } from '../shared/confirm-action/confirm-action.component';



@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAreaComponent implements OnInit {
  public messageStatus: string;
  public reports: Array<{}> = data;
  public isProcessing: boolean = false;
  public messageType: string;
  public fileInput: FormGroup;
  public readingFiles: boolean = false;
  public readingFilesErrorMessage: string;
  public isReportsFetched: boolean = false
  public reportsFetchingErrorMessage: string;
  public reportsFetchingmessageType: string;
  private totalMaxFilesSize: number = 10000000;
  private reportDomIdx: number;
  
  constructor(
    private userAreaService: UserAreaService,
    private readImgService: ReadImgService,
    private dialog: MatDialog,
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit() {
    this.userAreaService.getReports()
      .subscribe(reports =>{
        console.log(reports);
        //this.reports = reports;
        this.isReportsFetched = true;
      },
      error =>{
        this.reportsFetchingmessageType = 'fail';
        this.reportsFetchingErrorMessage = 'משהו השתבש, נסה שוב או פנה לתמיכה טכנית'
      })
    this.fileInput = new FormGroup({
      'evidence': new FormControl(null, [this.validatorsService.maxInputFiles, FileValidator.maxContentSize(this.totalMaxFilesSize)])
    })
  }

  public confirmSaveChanges(report: editReport, reportId: string, idx: number): void {
    this.confirmAction('לשמור שינויים?')
      .subscribe(actinConfiremd => {
        if (actinConfiremd) {
          this.saveChanges(report, reportId, idx)
        }
      })
  }

  public confirmDeleteReport(reportId: string, idx: number): void {
    this.confirmAction('למחוק דיווח?')
      .subscribe(actinConfiremd => {
        if (actinConfiremd) {
          this.deleteReport(reportId, idx)
        }
      })
  }

  public confirmDeleteEvidence(reportId: string, evidenceUrl: string, idx: number): void {
    this.confirmAction('למחוק הוכחה?')
      .subscribe(actionConfirmed => {
        if (actionConfirmed) {
          this.deleteEvidence(reportId, evidenceUrl, idx)
        }
      })
  }

  private saveChanges(report: editReport, reportId: string, idx: number): void {
    this.reportDomIdx = idx
    this.isProcessing = true
    report.evidence = this.fileInput.value.evidence
    
    this.userAreaService.saveChanges(reportId, report)
      .subscribe(() => {
        this.handelResponse('השינויים נשמרו בהצלחה.', 'success');
      },
        error => {
          this.handelResponse('משהו השתבש..., נסה שוב או פנה למפתח האתר.', 'fail');

        }
      )
  }

  private deleteReport(reportId: string, idx: number): void {
    this.isProcessing = true;
    this.reportDomIdx = idx
    this.userAreaService.deleteReport(reportId)
      .subscribe(() => {
        this.handelResponse('הדיווח נמחק בהצלחה.', 'success');
      },
        error => {
          this.handelResponse('משהו השתבש...,נסה שוב או פנה לפתח האתר.', 'fail');
        }
      )
  }

  private deleteEvidence(reportId: string, evidenceUrl: string, idx: number): void {
    this.isProcessing = true
    this.reportDomIdx = idx
    this.userAreaService.deleteEvidence(reportId, evidenceUrl)
      .subscribe(() => {
        this.handelResponse('ההוכחה נמחקה בהצלחה', 'success');
      },
        error => {
          this.handelResponse('משהו השתבש...,נסה שוב או פנה לפתח האתר.', 'fail');
        })
  }

  public readEvidence(): void {
    if (this.fileInput.value.evidence) {
      this.readingFiles = true;
      const files = this.fileInput.value.evidence.files;
      this.readImgService.readFile(files)
        .subscribe(files => {
          this.readingFiles = false;
          this.fileInput.value.evidence = files;
          this.readingFilesErrorMessage = '';
        },
          error => {
            this.readingFiles = false;
            this.readingFilesErrorMessage = 'משהו השתבש בעת קריאת הקובץ נסה שוב או נסה להעלות קובץ אחר'
          }
        )
    }
  }

  private handelResponse(message: string, messageType: string): void {
    this.isProcessing = false;
    this.messageStatus = message;
    this.messageType = messageType;
    this.fileInput.reset()
    setTimeout(() => {
      this.messageType = '';
      this.messageStatus = '';
    }, 3000)
  }

  public openEvidence(evidence: string): void {
    this.dialog.open(EvidenceComponent, { data: [evidence], panelClass: 'evidence' })
  }

  public confirmAction(text: string) {
    const dialogRef = this.dialog.open(ConfirmActionComponent, { data: { text } });
    return dialogRef.afterClosed()
  }
}
