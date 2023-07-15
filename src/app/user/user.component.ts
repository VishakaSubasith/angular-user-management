import {Component, Inject} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {UserService} from "../services/user.service";
import { MatTableDataSource } from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";

export interface userInterface {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  id: number;
  password: string;
}


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
export interface DialogData {
  animal: string;
  name: string;
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

  animal: any;
  name: any;

  constructor(private userService:UserService,private dialog: MatDialog) {
    this.getAllUsers()
  }
  //
  // dataToDisplay = [...ELEMENT_DATA];
  //
  // dataSource = new ExampleDataSource(this.dataToDisplay);

  openDialog(isNewRecord:any): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {name: this.name, animal: this.animal, isNewRecord},
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
    })

  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((data:any)=>{
      console.log("data",data)
      this.users = data
      this.dataSource = new MatTableDataSource(data)

    })
  }
}

