import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {baseURL} from "../commen";


@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private httpClient: HttpClient) { }

  registerAdmin(data:any){
    return this.httpClient.post(baseURL + 'admin/', data);
  }
  getUserbyEmail(email: string) {
    return this.httpClient.get(baseURL + 'admin?email=' + email);
  }

}
