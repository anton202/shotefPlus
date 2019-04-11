import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  finishedReadingFiles = new Subject();

  readFile(files) {
    return new Observable((observer) => {
      const encodedFiles = [];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        encodedFiles.push(fileReader.result);
        if (encodedFiles.length !== files.length) {
          fileReader.readAsDataURL(files[encodedFiles.length])
        } else {
          observer.next(encodedFiles);
          this.finishedReadingFiles.next(true);
        }
      }
      fileReader.readAsDataURL(files[encodedFiles.length])
    })
  }

  // max 4 images validator
  maxInputFiles(control: FormControl) {
    if (control.value) {
      console.log(control.value)
      const filesAmount = control.value.files.length;
      return filesAmount <= 4 ? null : { maxInputFiles: { valid: false } }
    }
  }

}