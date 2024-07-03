import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/users';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input() user:User;

  @Output() openEventEmitter = new EventEmitter()

  @Output() newUserEventEmitter:EventEmitter<User> = new EventEmitter()

  constructor(){
    this.user = new User();
  }

  onSubmit(userForm:NgForm):void{
    if(userForm.valid){
      this.newUserEventEmitter.emit(this.user)
      console.log(this.user)
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear( userForm:NgForm ):void{
    this.user = new User();
    userForm.reset();
    userForm.resetForm();

  }

  onOpenClose(){
    this.openEventEmitter.emit();
  }

}
