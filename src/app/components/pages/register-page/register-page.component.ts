import { NgClass } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RegisterService } from './services/register.service';
import { ToastService } from '../../shared/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  providers: [RegisterService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  constructor(private regService: RegisterService, private toastService: ToastService, private router: Router) {

  }
  showLoader:boolean = false;

  registrationForm = new FormGroup({
    email: new FormControl('', Validators.email),
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  formSubmit() {
    this.showLoader = true;
    interface stringKeys {
      [index: string]: string;
    }
    let reqBody = {} as stringKeys;
    Object.keys(this.registrationForm.controls).forEach(key => {
      reqBody[key] = this.registrationForm.get(key)?.value;
    });
    this.regService.userRegister(reqBody).subscribe((res: any) => {
      setTimeout(() => {
        this.showToast(res.message, 'success');
        this.showLoader = false;
      }, 2000);
    }, (e) => {
      setTimeout(() => {
        this.showToast(e.error.message, 'danger');
        this.showLoader = false
      }, 2000);
    });
  }

  formCancel() {
    
  }

  showToast(message: string, type: string = 'secondary') {
    this.toastService.show({ message, classname: '', delay: 2000}, type);
  }
}
