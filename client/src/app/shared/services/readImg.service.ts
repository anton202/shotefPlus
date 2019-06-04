import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReadImgService {
  public finishedReadingFiles: Subject<boolean> = new Subject();

  public readFile(files: Array<any>): Observable<any> {
    return new Observable((observer) => {
      const encodedFiles = [];
      const fileReader = new FileReader();
      
      fileReader.onerror = (error)=> {
        observer.error(error)
      fileReader.abort()
    }
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

 

}