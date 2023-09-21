import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, OTPVerification } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [NgbActiveModal]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  sentOTP: boolean = false;
  OTPButtonText!: string;
  isLoading!: boolean;
  error!: string;
  loginId!: string;
  isOTPMatched!: boolean;
  respMessage!: string;

  constructor(private authService: AuthService, private modalService: NgbModal, private modalRef: NgbActiveModal, config: NgbModalConfig, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.OTPButtonText = "Send OTP";
    console.log(`***********1. SentOTP val: ${this.sentOTP}`);
    this.forgotPasswordForm = new FormGroup({
      'userIdentity': new FormControl('', [Validators.required]),
      'OTP': new FormControl('', [Validators.nullValidator, this.OTPInputValidation.bind(this)])
    });
  }

  private OTPInputValidation(control: FormControl): { [key: string]: boolean } | null {
    console.log(`***********2. SentOTP val: ${this.sentOTP}`);
    if (!this.sentOTP)
      return null;
    else {
      if (control.value?.length > 0)
        return null;
      else
        return { required: true };
    }
  }

  get fpControls() {
    return this.forgotPasswordForm.controls;
  }

  printForgotFormval() {
    console.log(this.forgotPasswordForm);
  }


  onSubmit(content: any) {
    if (!this.sentOTP) {
      console.warn("OTP sending....Button clicked Send OTP..");
      this.respMessage = '';
      this.isLoading = true;
      this.authService.sendOTP(this.forgotPasswordForm.value["userIdentity"]).subscribe({
        next: respData => {
          console.log(respData);
          this.error = '';
          this.isLoading = false;
          this.sentOTP = true;
          this.OTPButtonText = "Verify Account";
          this.loginId = respData.loginId;
        },
        error: errResp => {
          console.log(errResp);
          this.error = errResp.error.error;
          this.isLoading = false;
          this.modalRef = this.modalService.open(content, { centered: true });
        }
      });
    }
    else {
      console.warn("Clicking on Verifying OTP.....");
      this.isLoading = true;
      this.respMessage = '';
      const OTPVerifyReqPayload: OTPVerification = { loginId: this.loginId, enteredOTP: this.forgotPasswordForm.value["OTP"] };
      this.authService.verifyOTP(OTPVerifyReqPayload).subscribe({
        next: respData => {
          console.log(respData);
          this.error = '';
          this.isLoading = false;
          this.isOTPMatched = respData.OTPmatched;
          if (this.isOTPMatched) {
            this.router.navigate(['/reset-password'], { queryParams: { loginId: this.loginId } });
          }
          else {
            this.modalRef = this.modalService.open(content, { centered: true });
            this.respMessage = "Please enter correct OTP!"
          }
        },
        error: errResp => {
          console.log(errResp);
          this.error = errResp.error.error;
          this.isLoading = false;
          this.modalRef = this.modalService.open(content, { centered: true });
        }
      })
    }
    console.log(this.forgotPasswordForm.value);
    this.forgotPasswordForm.setErrors({ 'invalid': true });
  }

  sendOTPAgain(content: any) {
    console.warn("Sending OTP again...")
    this.sentOTP = false;
    this.isLoading = true;
    this.authService.sendOTP(this.forgotPasswordForm.value["userIdentity"]).subscribe({
      next: respData => {
        console.log(respData);
        this.error = '';
        this.sentOTP = true;
        this.isLoading = false;
        this.loginId = respData.loginId;
      },
      error: errResp => {
        console.log(errResp);
        this.error = errResp.error.error;
        this.isLoading = false;
        this.modalRef = this.modalService.open(content, { centered: true });
      }
    });
  }

  closeAfterError() {
    this.modalRef.close();
    if (!this.sentOTP)
      this.forgotPasswordForm.reset();
    else
      this.forgotPasswordForm.patchValue({ 'OTP': '' });
  }
}
