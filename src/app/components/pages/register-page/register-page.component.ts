import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RegisterService } from './services/register.service';
import { ToastService } from '../../shared/toast/toast-service';
import { Router } from '@angular/router';
import { FormMapper } from '../../shared/form-mapper/form-mapper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  providers: [RegisterService, FormMapper],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent implements OnDestroy{
  subList: Subscription[] = [];
  constructor(private regService: RegisterService, 
    private toastService: ToastService, 
    private router: Router,
    private formMapper: FormMapper
  ) {

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
    const reqBody = this.formMapper.mapForm(this.registrationForm);

    this.subList.push(
      this.regService.userRegister(reqBody).subscribe({
        next: (res) => {
            this.showToast(res.message, 'success');
            this.showLoader = false;
            this.router.navigateByUrl('/login')
        },
        error: (e) => {
            this.showToast(e.error.message, 'danger');
            this.showLoader = false
        }
      })
    );
  }

  formCancel() {
    
  }

  showToast(message: string, type: string = 'secondary') {
    this.toastService.show({ message, classname: '', delay: 2000}, type);
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() })
  }
}
