import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlOptions, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  passVal!: string;

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
      'confirmPassword': new FormControl('', [Validators.required, this.passwordMatcher.bind(this)]),
      'contactNumber': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$'), this.contactNumberValidation])
    });
    this.error = '';
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

  onSubmit() {
    console.log(this.registrationForm);
  }
}
