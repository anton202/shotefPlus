import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material';

import { UserAreaService } from './user-area.service';
import { SharedService } from '../shared/shared.service';
import { editReport } from '../shared/models/edit-report'
import { FileValidator } from '../../../node_modules/ngx-material-file-input'

import { data } from './data';
import { EvidenceComponent } from '../evidence/evidence.component';


@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAreaComponent implements OnInit {
  messageStatus: string;
  reports: Array<{}> = data;
  isProcessing: boolean = false;
  messageType: string;
  fileInput: FormGroup;
  readingFiles: boolean = false;
  totalMaxFilesSize: number = 10000000;
  reportDomIdx: number;

  constructor(private userAreaService: UserAreaService, private sharedService: SharedService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userAreaService.getRecords();
    this.fileInput = new FormGroup({
      'evidence': new FormControl(null, [this.sharedService.maxInputFiles, FileValidator.maxContentSize(this.totalMaxFilesSize)])
    })
  }

  public confirmSaveChanges(report: editReport, reportId: string, idx: number): void {
    this.userAreaService.confirmAction('לשמור שינויים?')
      .subscribe(actinConfiremd => {
        if (actinConfiremd) {
          this.saveChanges(report, reportId, idx)
        }
      })
  }

  public confirmDeleteReport(reportId: string, idx: number): void {
    this.userAreaService.confirmAction('למחוק דיווח?')
      .subscribe(actinConfiremd => {
        if (actinConfiremd) {
          this.deleteReport(reportId, idx)
        }
      })
  }

  public confirmDeleteEvidence(reportId: string, evidenceUrl: string, idx: number): void {
    this.userAreaService.confirmAction('למחוק הוכחה?')
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
    console.log(idx, this.reportDomIdx)
    setTimeout(() => {

      this.userAreaService.saveChanges(reportId, report)
        .subscribe(() => {
          this.handelResponse('השינויים נשמרו בהצלחה.', 'success');
        },
          error => {
            this.handelResponse('משהו השתבש..., נסה שוב או פנה למפתח האתר.', 'fail');

          }
        )

    }, 6000)
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
    setTimeout(()=>{

      this.userAreaService.deleteEvidence(reportId, evidenceUrl)
            .subscribe(() => {
              this.handelResponse('ההוכחה נמחקה בהצלחה', 'success');
            },
              error => {
                this.handelResponse('משהו השתבש...,נסה שוב או פנה לפתח האתר.', 'fail');
              })

    },4000)
  }

  public readEvidence(): void {
    if (this.fileInput.value.evidence) {
      this.readingFiles = true;
      const files = this.fileInput.value.evidence.files;
      this.sharedService.readFile(files)
        .subscribe(files => {
          this.readingFiles = false;
          this.fileInput.value.evidence = files;
        })
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
    this.dialog.open(EvidenceComponent, { data: { evidence: [evidence] } })
  }

}
