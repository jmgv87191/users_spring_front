import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/users';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { error } from 'node:console';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  user:User;
  errors: any = {}

  constructor( 
    private aRoute:ActivatedRoute,
    private sharingData: SharingDataService ,
    private _service: UserService
  )
    
    
    {
    this.user = new User();
    }

  ngOnInit(): void {

    this.sharingData.errorsUserFormEventEmitter.subscribe( errors => this.errors = errors )
    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user)

    this.aRoute.paramMap.subscribe(params =>{
      const id: number = +(params.get('id') || '0')
      if (id > 0) {
        // this.sharingData.findUserByIdEventEmitter.emit(id);
        this._service.findById(id).subscribe( user => this.user = user )
      }
    })
  }

  onSubmit(userForm:NgForm):void{
      this.sharingData.newUserEventEmitter.emit(this.user)
/*     userForm.reset();
    userForm.resetForm(); */
  }

  onClear( userForm:NgForm ):void{
    this.user = new User();
    userForm.reset();
    userForm.resetForm();

  }


}
