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
  getAllUsers(offset:number = 0,limit:number=0){

    let users = this.httpClient.get(`${baseURL}user`);
    // const size = limit || users?.length
    // const from = offset * size;
    console.log("users.====>>>",users)
    return users;
  }
  getUserbyEmail(email: string) {
    return this.httpClient.get(baseURL + 'user?email=' + email);
  }
  deleteUser(id: number) {
    return this.httpClient.delete(baseURL + 'user/' + id);
  }
  updateUser(id: number, data: any) {
    console.log("id===,",id)
    console.log("data===,",data)
    return this.httpClient.put(baseURL + 'user/' + id, data);
  }
}
