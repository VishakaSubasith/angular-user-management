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
  displayedColumns: string[] = [ 'firstName','lastName', 'email','action'];

  users:any
  dataSource:any;
  pageUsers: any[] = [];
  loading:any;

  @ViewChild(MatPaginator) pagination!: MatPaginator;


  constructor(private userService:UserService,private dialog: MatDialog,private toast:ToastrService) {
    this.getData(0,5)
    // this.getAllUsers()
  }
  //
  // dataToDisplay = [...ELEMENT_DATA];
  //
  // dataSource = new ExampleDataSource(this.dataToDisplay);

  addUser(){

    this.openDialog(true,null,null,null,null)

  }
  updateUser(id: string | number,firstName:string,lastName:string, email:string){
    this.openDialog(false,id,firstName,lastName,email)
  }

  openDialog(isNewRecord:boolean, id:string |number | null, firstName:string | null,lastName:string| null, email:string | null): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { id,firstName, lastName,email, isNewRecord},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
      // this.getAllUsers()
      this.getData(0,5)
    });
  }
  removeUser(id:string|number) {
    this.userService.deleteUser(id).subscribe(result=>{
      console.log("result===>>",result)
      // this.getAllUsers()
      this.getData(0,5)
      this.toast.success("Deleted Successfully")
    })

  }
  // getAllUsers(){
  //   this.userService.getAllUsers().subscribe((data:any)=>{
  //     console.log("data",data)
  //     this.users = data.users.sort((a:any, b:any) => {
  //       return a.firstName - b.firstName
  //     })
  //     this.dataSource = new MatTableDataSource(data.users)
  //     console.log("this.dataSource1111===>>>",this.dataSource)
  //     this.dataSource.paginator = this.pagination;
  //
  //   })
  // }

  getNextData(currentSize:any,offset:any,limit:any){
     this.userService.getAllUsers(offset,limit).subscribe((res:any)=>{
       this.pageUsers.length= currentSize;
       this.pageUsers.push(...res.users)
       this.pageUsers.length = res.total;


       this.dataSource = new MatTableDataSource(this.pageUsers)
       this.dataSource._updateChangeSubscription()
       this.dataSource.paginator = this.pagination;
       this.loading = false
     })
  }
  getData(offset:any,limit:any){
     this.userService.getAllUsers(offset,limit).subscribe((res:any)=>{
       console.log("res===",res)
       this.pageUsers.push(...res.users)
       this.pageUsers.length = res.total;

       console.log(this.pageUsers)

       this.dataSource = new MatTableDataSource(this.pageUsers)
       console.log("this.dataSource===>>>",this.dataSource)
       this.dataSource._updateChangeSubscription()
       this.dataSource.paginator = this.pagination;
       this.loading = false
     })
  }

  pageChanged(event:any){

    this.loading = true;
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    const prevIndex = event.previousIndex;
    const previousSize = pageSize * pageIndex;

    this.getNextData(previousSize,pageIndex.toString(),pageSize.toString())
  }
}

