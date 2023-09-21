import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, Users } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  isLoading!: boolean;
  error!: string;
  getAllUsersDetails!: Users[];
  respText!: string;
  loggedInUserId!: string | null;

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user.subscribe(userInfo => this.loggedInUserId = userInfo.loginId);
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe({
      next: respData => {
        console.log(respData);
        this.isLoading = false;
        this.error = '';
        this.getAllUsersDetails = respData
      },
      error: errResp => {
        console.log(errResp);
        this.isLoading = false;
        this.error = errResp.error.error;
      }
    });
  }

  makeAdmin(loginId: string, content: any) {
    this.isLoading = true;
    this.authService.makeAsAdmin(loginId).subscribe({
      next: respData => {
        console.log(respData);
        this.error = '';
        this.respText = respData.message;
        this.isLoading = false;
      },
      error: errResp => {
        console.log(errResp);
        this.error = errResp.error.error;
        this.respText = '';
        this.isLoading = false;
      }
    });
    this.modalService.open(content);
    this.getAllUsers();
  }
}
