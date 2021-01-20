import { Component, OnInit, Input } from '@angular/core';
import {User} from '../models/user';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() selectedUser: User;
  constructor() { }

  ngOnInit(): void {
  }

}
