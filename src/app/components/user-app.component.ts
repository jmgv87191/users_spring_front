import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [ UserComponent, UserFormComponent,RouterOutlet, NavbarComponent ],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {


  users:User[] = [];
  userSelected:User;

  constructor( private _userService:UserService,
              private sharingData: SharingDataService

  ){ 
    this.userSelected = new User;
  }

  ngOnInit(): void {
    this._userService.findAll().subscribe(users => this.users = users)
  }

  addUser(user:User){

    this.sharingData.newUserEventEmitter.subscribe((user)=>{

      if (user.id > 0 ) {
        this.users = this.users.map( u => (u.id == user.id)? { ...user }: u)
      }else{
        this.users = [...this.users,{...user, id:new Date().getTime()}]
      }
  
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado con exito!",
        icon: "success"
      });
    })


    this.userSelected = new User();

  }

  removeUser( id: number ):void{
  
    this.s

    Swal.fire({
      title: "Seguro que desea eliminar?",
      text: "Cuidado el dato del usuario sera eliminado del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(user => user.id != id);

        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado con exito",
          icon: "success"
        });
      }
    });
  }

  setSelectedUsar(userRow:User):void{
    this.userSelected = {...userRow}
  }



}
