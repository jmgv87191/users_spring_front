import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/users';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  user:User;


  constructor( private sharingData: SharingDataService ){
    this.user = new User();
  }

  onSubmit(userForm:NgForm):void{
    if(userForm.valid){
      this.sharingData.newUserEventEmitter.emit(this.user)
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


}
