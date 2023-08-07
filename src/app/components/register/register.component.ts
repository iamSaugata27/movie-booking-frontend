import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

interface registrationData {
  "firstname": string,
  "lastname": string,
  "loginId": string,
  "email": string,
  "password": string,
  "confirmPassword": string,
  "contactNumber": number
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  error!: string;
  passmodel!: string;
  cnfrmpassmodel!: string;

  constructor(private authService: AuthService, config: NgbModalConfig, private modalService: NgbModal, private router: Router) {
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
      'confirmPassword': new FormControl('', [Validators.required]),
      'contactNumber': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')])
    });
    this.error = '';
  }

  MatchPassword() {

    //const passwordControl = this.rfControls['password'];
    const password = this?.passmodel;
    const confirmPasswordControl = this?.cnfrmpassmodel;

    // if (!passwordControl || !confirmPasswordControl) {
    //   return null;
    // }

    // if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
    //   return null;
    // }

    // if (passwordControl.value !== confirmPasswordControl.value) {
    //   // confirmPasswordControl.setErrors({ passwordMismatch: true });
    //   return { passwordMismatch: true };
    // } else {
    //   // confirmPasswordControl.setErrors(null);
    //   return null;
    // }
    if (password !== confirmPasswordControl) {
      return { passwordMismatch: true };
    } else {
      return { passwordMismatch: true };
    }
  }

  hello(event: any) {
    console.log(event)
    console.log("***cnfrm pass--", this.rfControls['confirmPassword'].value)
    console.log("***pass--", this.rfControls['password'].value)
    console.log(this.registrationForm);
  }

  get rfControls() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    console.log(this.registrationForm);
  }
}
