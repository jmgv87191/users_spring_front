import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id:1,
      name:'juan',
      lastname:'gtz',
      email:'asdas@adasd',
      username:'jmgv',
      password:'contraseña'
    },
    {
      id:2,
      name:'alo',
      lastname:'garcia',
      email:'alo@adasd',
      username:'alocita',
      password:'contraseña123'
    },
  ]

  constructor() { }


  findAll():Observable<User[]>{
    return of( this.users )
  }

}
