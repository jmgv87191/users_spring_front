import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  userService: any;


  constructor( private router:Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private aRoute: ActivatedRoute
  ){

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users']
    }


  }

  ngOnInit(): void {

    if (this.users==undefined || this.users==null || this.users.length == 0) {
      console.log('consulta findALl')

/*       this.service.findAll().subscribe( (users) => {
        this.users = users
      } ) */
        this.aRoute.paramMap.subscribe( params =>{
          const page = +(params.get('page') || '0')
          this.service.findAllpageable( page ).subscribe( pageable => this.users = pageable.content as User[]);
        } )
      
    }

    

  }

  onRemoveUser( id:number ):void{

    this.sharingData.idUserEventEmitter.emit(id)

  }

  onSelectedUSer( user: User ):void{
    this.router.navigate(['/users/edit',user.id])
  }


}
