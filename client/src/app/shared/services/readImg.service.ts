import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReadImgService {
 
  public readFile(files: Array<Blob>): Observable<any> {
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
          }
        }
        fileReader.readAsDataURL(files[encodedFiles.length])     
    })
  }

 

}