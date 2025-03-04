import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { FormMapper } from '../../shared/form-mapper/form-mapper';
import { ToastService } from '../../shared/toast/toast-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../store/user/user-actions';
import { StorageService } from '../../shared/storage/storage-service';
import { sessionKeys } from '../../../app.constants';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  providers: [FormMapper],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private store = inject(Store);
  constructor(private loginService: LoginService, 
    private formMapper: FormMapper,
    private toastService: ToastService,
    private router: Router,
    private storageService: StorageService
  ) {
  }
  showLoader:boolean = false;
  loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
  });

  onFormSubmit() {
    this.showLoader = true;
    const reqBody = this.formMapper.mapForm(this.loginForm);
    this.loginService.userLogin(reqBody).subscribe(res => {
      setTimeout(() => {
        const toastMessage = `Welcome Back ${res.result.user.name}`;
        this.showToast(toastMessage, 'success');
        this.showLoader = false;
        this.store.dispatch(UserActions.loggedIn({ user: res?.result?.user }));
        this.storageService.assignItemToSession(sessionKeys.authToken,res?.result?.token);
        const sessionRole = JSON.stringify(res?.result?.user);
        this.storageService.assignItemToSession(sessionKeys.userPerm, sessionRole);
        if(res?.result?.user?.role?.toLowerCase() === 'admin') {
          this.router.navigateByUrl('users');
        } else {
          this.router.navigateByUrl('instruments');
        }
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
