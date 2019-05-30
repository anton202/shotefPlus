import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitDelayService {
fakeJsonApi = 'https://app.fakejson.com/q';

  constructor(private http: HttpClient) { }

  public submitDelayToApi(delayForm:{}): Observable<any>{
  return this.http.post(this.fakeJsonApi,delayForm)
  }

  
}


