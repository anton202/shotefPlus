import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubmitDelayService {
fakeJsonApi = 'https://app.fakejson.com/q';

  constructor(private http: HttpClient) { }

  submitDelayToApi(delayForm){
  return this.http.post(this.fakeJsonApi,delayForm)
  }

  
}


