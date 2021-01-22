import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from '../models/user';
import { UserService } from '../service/user/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser:User;
  constructor(private userService:UserService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data=>this.users=data);
  }
  selectUser(user:User){
    if(this.selectedUser!=null && this.selectedUser==user){
      this.selectedUser=null;
    }else{
      this.selectedUser=user;
    }
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
  convertImage(image:string) :SafeUrl{
    let objectURL = 'data:image/jpeg;base64,' + image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  //insert user popup
  openInsertUserWindow(){
    
  }
}
