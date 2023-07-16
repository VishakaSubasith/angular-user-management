import {Component, Inject, ViewChild} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {UserService} from "../services/user.service";
import { MatTableDataSource } from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PopupComponent} from "../components/popup/popup.component";
import {MatPaginator} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";

export interface userInterface {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  id: number;
  password: string;
}




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})



export class UserComponent {
  displayedColumns: string[] = ['id', 'firstName','lastName', 'email','action'];

  users:any
  dataSource:any

  @ViewChild(MatPaginator) pagination!: MatPaginator;


  constructor(private userService:UserService,private dialog: MatDialog,private toast:ToastrService) {
    this.getAllUsers()
  }
  //
  // dataToDisplay = [...ELEMENT_DATA];
  //
  // dataSource = new ExampleDataSource(this.dataToDisplay);

  addUser(){

    this.openDialog(true,null,null,null,null)

  }
  updateUser(id:number,firstName:string,lastName:string, email:string){
    this.openDialog(false,id,firstName,lastName,email)
  }

  openDialog(isNewRecord:boolean, id:number | null, firstName:string | null,lastName:string| null, email:string | null): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { id,firstName, lastName,email, isNewRecord},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
      this.getAllUsers()
    });
  }
  removeUser(id:number) {
    this.userService.deleteUser(id).subscribe(result=>{
      console.log("result===>>",result)
      this.getAllUsers()
      this.toast.success("Deleted Successfully")
    })

  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((data:any)=>{
      console.log("data",data)
      this.users = data.sort((a:any, b:any) => {
        return a.id - b.id;
      })
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.pagination;

    })
  }
}

