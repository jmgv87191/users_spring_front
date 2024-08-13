import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
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

  constructor( private router:Router,
    private _userService:UserService,
    private sharingData: SharingDataService

  ){}

  ngOnInit(): void {
    this._userService.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById(){
    this.sharingData.findUserByIdEventEmitter.subscribe(id=>{
      const user = this.users.find( user => user.id == id );
      this.sharingData.selectUserEventEmitter.emit(user);
    })
  } 

  addUser(){

    this.sharingData.newUserEventEmitter.subscribe((user)=>{

      if (user.id > 0 ) {
        this._userService.update(user).subscribe(userUpdated =>{
          this.users = this.users.map( u => (u.id == userUpdated.id)? { ...userUpdated }:u)
          this.router.navigate(['/users'], {state: {users: this.users} })

        } )
      }else{
        this._userService.create(user).subscribe(userNew =>{
          console.log( userNew)
          this.users = [...this.users,{...userNew}]
          this.router.navigate(['/users'], {state: {users: this.users} })

        })
      }
/*       this.router.navigate(['/users'])
 */
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado con exito!",
        icon: "success"
      });
    })
  }

  removeUser( ):void{
  
    this.sharingData.idUserEventEmitter.subscribe(id=>{

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

          this._userService.remove(id).subscribe(()=>{
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'],{skipLocationChange: true}).then(()=>{
              this.router.navigate(['/users'])
          })

          })
          
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito",
            icon: "success"
          });
        }
      });
    })

  }





}
