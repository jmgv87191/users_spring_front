import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { error } from 'node:console';

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
    private sharingData: SharingDataService,
    private aRoute:ActivatedRoute

  ){}

  ngOnInit(): void {
    // this._userService.findAll().subscribe(users => this.users = users);
    this.aRoute.paramMap.subscribe( params =>{
      const page = +(params.get('page') || '0')
      this._userService.findAllpageable( page ).subscribe( pageable => this.users = pageable.content as User[]);
    } )
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
        this._userService.update(user).subscribe({ next: (userUpdated) =>{
          this.users = this.users.map( u => (u.id == userUpdated.id)? { ...userUpdated }:u)
          this.router.navigate(['/users'], {state: {users: this.users} })

          Swal.fire({
            title: "Actualizado!",
            text: "Usuario editado con exito!",
            icon: "success"
          });

        },
      error:( err )=>{
        // console.log(err.error)
        if(err.status  == 400){

        this.sharingData.errorsUserFormEventEmitter.emit( err.error );
        }
      }})
      }else{
        this._userService.create(user).subscribe({
          next:userNew =>{
          console.log( userNew)
          this.users = [...this.users,{...userNew}]
          this.router.navigate(['/users'], {state: {users: this.users} })

          Swal.fire({
            title: "Creado nuevo usuario!",
            text: "Usuario creado con exito!",
            icon: "success"
          });

        },
      error:(err)=>{
        // console.log( err.error )
        console.log(err.status)
        if(err.status  == 400){
          this.sharingData.errorsUserFormEventEmitter.emit( err.error );
        } 

      }})
      }


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
          this.router.navigate(['/users'], {state: {users: this.users} })
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
