import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { FormMapper } from '../../shared/form-mapper/form-mapper';
import { ToastService } from '../../shared/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  providers: [LoginService, FormMapper],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(private loginService: LoginService, 
    private formMapper: FormMapper,
    private toastService: ToastService,
    private router: Router
  ) {}
  showLoader:boolean = false;
  loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
  });

  onFormSubmit() {
    this.showLoader = true;
    const reqBody = this.formMapper.mapForm(this.loginForm);
    this.loginService.userLogin(reqBody).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        const toastMessage = `Welcome Back ${res.result.user.name}`;
        this.showToast(toastMessage, 'success');
        this.showLoader = false;
        this.router.navigateByUrl('')
      }, 2000);
    }, (e) => {
      setTimeout(() => {
        this.showToast(e.error.message, 'danger');
        this.showLoader = false
      }, 2000);
    })
  }

  showToast(message: string, type: string = 'secondary') {
    this.toastService.show({ message, classname: '', delay: 2000}, type);
  }
}
