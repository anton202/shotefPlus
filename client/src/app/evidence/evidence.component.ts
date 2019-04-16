import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class EvidenceComponent implements OnInit {
  currentImg = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data.evidence)
  }

 changeImg(direction){
   if(direction === 'forward' && this.currentImg + 1 < this.data.evidence.length){
     this.currentImg += 1;
   } else if(direction === 'backward' && this.currentImg  > 0){
     this.currentImg -= 1;
   }
 }

}
