import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [NgbActiveModal]
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  passVal!: string;
  error!: string;
  isLoading!: boolean;
  respMessage!: string;
  loginId!: null | string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private modalService: NgbModal, private modalRef: NgbActiveModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required, this.passwordMatcher.bind(this)])
    });
  }

  private passwordMatcher(control: FormControl): { [key: string]: boolean } | null {
    if (this.passVal?.length >= 6 && control.value !== this.passVal)
      return { passwordMismatch: true };
    return null;
  }

  passwordVal() {
    console.log(this.changePasswordForm);
    this.passVal = this.cpfControls['password'].value;
  }

  get cpfControls() {
    return this.changePasswordForm.controls;
  }

  onSubmit(content: any) {
    this.loginId = '';
    this.route.queryParamMap.subscribe(params => {
      this.loginId = params.get('loginId');
      console.log(this.loginId);
    });
    const { password, confirmPassword } = this.changePasswordForm.value;
    this.isLoading = true;
    this.authService.resetPassword(this.loginId, password, confirmPassword).subscribe({
      next: respData => {
        console.log(respData);
        this.error = '';
        this.isLoading = false;
        this.respMessage = respData.message;
        this.modalRef = this.modalService.open(content, { centered: true });
      },
      error: errResp => {
        console.log(errResp);
        this.isLoading = false;
        this.error = errResp.error.error;
        this.respMessage = '';
      }
    });
  }

  onVerified() {
    this.modalRef.close();
    this.router.navigate(['/login']);
  }
}
