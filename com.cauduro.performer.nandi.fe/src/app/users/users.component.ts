import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data=>this.users=data);
  }



}
