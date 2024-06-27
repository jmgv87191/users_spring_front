import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [ UserComponent, UserFormComponent ],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {

  title: string = 'Listado de '

  users:User[] = [];

  constructor( private _userService:UserService ){ 

  }

  ngOnInit(): void {
    this._userService.findAll().subscribe(users => this.users = users)
  }

  addUser(user:User){
    this.users = [...this.users,{...user, id:new Date().getTime()}]
  }

  removeUser( id: number ):void{
    this.users = this.users.filter(user => user.id != id);
  }



}
