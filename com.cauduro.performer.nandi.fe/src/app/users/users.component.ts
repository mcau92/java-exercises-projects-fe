import { Component, OnInit, HostListener } from '@angular/core';
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
  innerWidth:number;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.userService.findAll().subscribe(data=>this.users=data);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  //data operation
  add(name: string,surname: string): void {
    name = name.trim();
    surname= surname.trim();
    if (!name|| !surname) { return; }
    this.userService.addUser({ name,surname } as User)
      .subscribe(hero => {
        this.users.push(hero);
      });
  }
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.userId).subscribe();
  }
}
