import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, User } from 'src/app/services/auth.service';

export interface RegistrationData {
  "firstname": string,
  "lastname": string,
  "loginId": string,
  "email": string,
  "password": string,
  "confirmPassword": string,
  "contactNumber": number
}

export interface RegistrationRespData {
  message: string,
  loginId: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [NgbActiveModal]
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  error!: string;
  passVal!: string;
  respRegisterData!: RegistrationRespData;
  isLoading!: boolean;
  // modalRef!: NgbActiveModal;

  constructor(private authService: AuthService, config: NgbModalConfig, private modalService: NgbModal, private modalRef: NgbActiveModal, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'loginId': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required, this.passwordMatcher.bind(this)]),
      'contactNumber': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$'), this.contactNumberValidation])
    });
    this.error = '';
    this.isLoading = false;
  }

  private passwordMatcher(control: FormControl): { [key: string]: boolean } | null {
    if (this.passVal?.length >= 6 && control.value !== this.passVal)
      return { passwordMismatch: true };
    return null;
  }

  passwordVal() {
    console.log(this.registrationForm);
    this.passVal = this.rfControls['password'].value;
  }

  private contactNumberValidation(control: FormControl): { [key: string]: boolean } | null {
    if (control.value?.length > 0 && control.value?.length !== 10 && /^\d+$/.test(control.value))
      return { contactNumberLengthUnmatched: true }
    return null;
  }

  get rfControls() {
    return this.registrationForm.controls;
  }

  onSubmit(content: any) {
    console.log(this.registrationForm);
    this.isLoading = true;
    const registrationDetails: RegistrationData = this.registrationForm.value;
    //const { firstname, lastname, loginId, email, password, confirmPassword, contactNumber }: RegistrationData = this.registrationForm.value;
    console.log(registrationDetails);
    this.authService.register(registrationDetails).subscribe({
      next: respData => {
        console.log(respData);
        this.error = '';
        this.respRegisterData = respData;
        this.isLoading = false;
        // this.router.navigate(['/login']);
      },
      error: errResp => {
        console.log(errResp);
        this.error = errResp.error.errors;
        this.isLoading = false;
      },
    });
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  regSuccess() {
    this.modalRef.close();
    this.router.navigate(['/login']);
  }
}
