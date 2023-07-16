import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseURL,baseURLNode} from "../commen";
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  saveUsers(data:any){
    return this.httpClient.post(`${baseURLNode}/user`, data);
    // return axios.post(`${baseURLNode}/user`, {
    //   data
    // });
  }
  getAllUsers(offset:number = 0,limit:number=0){

    let users = this.httpClient.get(`${baseURLNode}/user/${offset}/${limit}`);
    // const size = limit || users?.length
    // const from = offset * size;
    console.log("users.====>>>",users)
    return users;
  }
  getUserbyEmail(email: string) {
    return this.httpClient.get(`${baseURLNode}/user/${email}`);
  }
  deleteUser(id: string|number) {
    console.log("id=====>>>",id)
    return this.httpClient.delete(`${baseURLNode}/user/${id}`);
  }
  updateUser(id: string | number, data: any) {
    console.log("id===,",id)
    console.log("data===,",data)
    return this.httpClient.put(`${baseURLNode}/user/${id}`, data);
  }
}
