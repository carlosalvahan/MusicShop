import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { FormMapper } from '../../shared/form-mapper/form-mapper';
import { ToastService } from '../../shared/toast/toast-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../store/user/user-actions';
import { StorageService } from '../../shared/storage/storage-service';
import { sessionKeys } from '../../../app.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  providers: [FormMapper],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnDestroy {
  private store = inject(Store);
  subList: Subscription[] = [];
  constructor(private loginService: LoginService,
    private formMapper: FormMapper,
    private toastService: ToastService,
    private router: Router,
    private storageService: StorageService
  ) {
  }
  showLoader: boolean = false;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onFormSubmit() {
    this.showLoader = true;
    const reqBody = this.formMapper.mapForm(this.loginForm);
    this.subList.push(
      this.loginService.userLogin(reqBody).subscribe({
        next: res => {
          setTimeout(() => {
            const toastMessage = `Welcome Back ${res.result.user.name}`;
            this.showToast(toastMessage, 'success');
            this.showLoader = false;
            this.store.dispatch(UserActions.loggedIn({ user: res?.result?.user }));
            this.storageService.assignItemToSession(sessionKeys.authToken, res?.result?.token);
            const sessionRole = JSON.stringify(res?.result?.user);
            this.storageService.assignItemToSession(sessionKeys.userPerm, sessionRole);
            if (res?.result?.user?.role?.toLowerCase() === 'admin') {
              this.router.navigateByUrl('users');
            } else {
              this.router.navigateByUrl('instruments');
            }
          }, 2000);
        },
        error: (e) => {
          setTimeout(() => {
            this.showToast(e.error.message, 'danger');
            this.showLoader = false
          }, 2000);
        }
      })
    );
  }

  showToast(message: string, type: string = 'secondary') {
    this.toastService.show({ message, classname: '', delay: 2000 }, type);
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() })
  }
}
