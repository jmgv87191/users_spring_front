import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/users';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input() users:User[] = []

  @Output() idUserEventEmitter = new EventEmitter();
  @Output() selectedUserEventEmitter = new EventEmitter();

  onRemoveUser( id:number ):void{

    this.idUserEventEmitter.emit(id)

  }

  onSelectedUSer( user: User ):void{
    this.selectedUserEventEmitter.emit(user);
  }


}
