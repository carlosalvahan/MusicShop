import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../../../../../store/user/user-model';
import { UserListService } from '../../services/user-list.service';
import { UnsubClass } from '../../../../shared/unsub-components/unsub-class';
import { ToastService } from '../../../../shared/toast/toast-service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  providers: [UserListService],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent extends UnsubClass implements OnInit{
  userService = inject(UserListService);
  toastService = inject(ToastService);

  userDetails = input<UserModel>(new UserModel());
  fieldsReadOnly = input<boolean>(false);

  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(this.userDetails().email, Validators.email),
      userName: new FormControl(this.userDetails().userName, Validators.required),
      firstName: new FormControl(this.userDetails().firstName, Validators.required),
      lastName: new FormControl(this.userDetails().lastName, Validators.required),
      address: new FormControl(this.userDetails().address, Validators.required),
      phoneNumber: new FormControl(this.userDetails().phoneNumber, Validators.required),
      role: new FormControl({ value: this.userDetails().role, disabled: this.fieldsReadOnly() }, Validators.required),
    });
  }
  
  showLoader: boolean = false;
  closeModal = output<void>();

  formSubmit() {
    console.log(this.registrationForm.controls);
    let userSubmit: UserModel = {
      id: this.userDetails().id
    };
    Object.keys(this.registrationForm.controls).forEach(key => {
      userSubmit = {
        ...userSubmit,
        [key]: this.registrationForm.get(key)?.getRawValue()
      }
    });
    console.log(userSubmit);
    this.subList.push(
      this.userService.updateUser(userSubmit).subscribe({
        next: res => {
          this.toastService.show({message: `User ${userSubmit.userName} has been updated.`}, 'success');
          this.closeModal.emit();
        }
      })
    )
  }

  formCancel() {
    
  }
}
