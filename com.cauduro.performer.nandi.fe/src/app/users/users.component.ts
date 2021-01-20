import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';
import { MessageService } from '../service/messages/message.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;
  constructor(private userService:UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data=>this.users=data);
  }

  onSelect(user: User): void {
    if(this.selectedUser!=null && this.selectedUser==user){
      this.messageService.clear;
      this.selectedUser=null;
    }else{
      this.selectedUser = user;
      this.messageService.add(`UserComponent: Selected user id=${this.selectedUser.userId}`);
    }
    
  }


}
