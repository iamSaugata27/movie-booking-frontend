import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Route, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, LoginDetails, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error!: string;


  constructor(private authService: AuthService, config: NgbModalConfig, private modalService: NgbModal, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'loginId': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
    this.error = '';
  }

  onSubmit(content: any) {
    console.info(this.loginForm)
    const loginDetails: LoginDetails = { loginId: this.loginForm.value.loginId, password: this.loginForm.value.password };
    this.authService.login(loginDetails).subscribe({
      next: respData => {
        console.log(respData);
        localStorage.setItem('role', respData.role);
        localStorage.setItem('token', respData.token);
        const user: User = { isLoggedIn: true, loginId: this.loginForm.value.loginId, role: respData.role };
        this.authService.user.next(user);
        this.authService.loggedIn(true);
        this.router.navigate(['/movies']);
      },
      error: errResp => {
        console.log(errResp);
        this.error = errResp.error.message;
        this.modalService.open(content);
      },
    });
  }
}
