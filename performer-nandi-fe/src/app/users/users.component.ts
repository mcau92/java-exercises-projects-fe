import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
