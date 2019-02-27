import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubmitDelayService {
apiUrl = 'https://data.gov.il/api/action/datastore_search';
query;
resource_id = 'f004176c-b85f-4542-8901-7b3176f9a054'

  constructor(private http: HttpClient) { }

  requestCompanyNameFromApi(companyNameOrNumber){
    this.query = companyNameOrNumber
    return this.http.get<{result}>(this.apiUrl+`?resource_id=${this.resource_id}&q=${this.query}&limit=5`)
  }
}


