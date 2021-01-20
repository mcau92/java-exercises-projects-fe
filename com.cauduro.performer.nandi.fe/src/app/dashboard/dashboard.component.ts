import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.userService.findAll()
      .subscribe(users => {
        if (users.length < 5) {
          this.users = users;
        } else {
          this.users = users.slice(1, 5);
        }
      });//TODO show 5 best performer
  }
}

