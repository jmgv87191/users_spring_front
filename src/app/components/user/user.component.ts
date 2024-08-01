import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  title: string = 'Listado de usuarios'

  users:User[] = []


  constructor( private router:Router,
              private service: UserService,
              private sharingData: SharingDataService
  ){
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users']
    }else{
    }
  }

  ngOnInit(): void {

    this.service.findAll().subscribe( users => this.users = users )


  }

  onRemoveUser( id:number ):void{

    this.sharingData.idUserEventEmitter.emit(id)

  }

  onSelectedUSer( user: User ):void{
    this.router.navigate(['/users/edit',user.id])
  }


}
