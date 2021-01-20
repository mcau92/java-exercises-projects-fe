import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';


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
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User)
      .subscribe(hero => {
        this.users.push(hero);
      });
  }
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.userId).subscribe();
  }
}
