import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseURL} from "../commen";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  saveUsers(data:any){
    return this.httpClient.post(baseURL + 'user/', data);
  }
  getAllUsers(){
    return this.httpClient.get(`${baseURL}user`);
  }
  getUserbyEmail(email: string) {
    return this.httpClient.get(baseURL + 'user?email=' + email);
  }
  deleteUser(id: number) {
    return this.httpClient.delete(baseURL + 'user/' + id);
  }
}
