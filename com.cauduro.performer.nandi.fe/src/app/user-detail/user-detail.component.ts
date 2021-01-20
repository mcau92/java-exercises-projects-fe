import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../service/user/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  selectedUser: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const id: string = this.route.snapshot.paramMap.get('userId');
    this.userService.getUser(id)
      .subscribe(user => this.selectedUser = user);
  }
  save(): void {
    this.userService.updateUser(this.selectedUser)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
