import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from '../models/user';
import { UserService } from '../service/user/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from 'querystring';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];
  public selectedUser: User;
  public newUser: User={userId:null,name:null,surname:null,cf:null,imageModel:null};
  public file=null;
  public closeResult = '';

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data => this.users = data);
  }
  selectUser(user: User) {
    if (this.selectedUser != null && this.selectedUser == user) {
      this.selectedUser = null;
    } else {
      this.selectedUser = user;
    }
  }

  //data operation
  add(name: string, surname: string): void {
    name = name.trim();
    surname = surname.trim();
    if (!name || !surname) { return; }
    this.userService.addUser({ name, surname } as User)
      .subscribe(hero => {
        this.users.push(hero);
      });
  }
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.userId).subscribe();
  }
  convertImage(image: string): SafeUrl {
    let objectURL = 'data:image/jpeg;base64,' + image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  saveNewUser(){
    if(this.newUser){
      this.userService.addUser(this.newUser).subscribe(hero => {
        this.users.push(hero);
      });

    }
  }
  //change event on file image
  public onFileChanged(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload=this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.newUser.imageModel = reader.result;
  }
  //insert user popup
  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
