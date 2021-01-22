import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  @Input() selectedUser: User;
  //image
  @ViewChild('valueFile')
  public valueFile: ElementRef;
  public selectedFile = null;

  constructor(
    private userService: UserService,
  ) { }
  ngOnInit(): void {
  }
  save(): void {
    this.userService.updateUser(this.selectedUser);
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile);
    uploadData.append("reportProgress", "true");

    this.userService.uploadImage(uploadData, this.selectedUser.userId)
      .subscribe(
        res => {
          console.log(res);

        },
        err => console.log('Error Occured duringng saving: ' + err)
      );
    this.valueFile.nativeElement.value=null;
    this.selectedFile=null

  }
}
