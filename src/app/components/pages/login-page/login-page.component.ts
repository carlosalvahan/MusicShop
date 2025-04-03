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
import { mergeMap, Subscription } from 'rxjs';
import { CartService } from '../cart-page/services/cart-service';
import { jwtDecode } from 'jwt-decode';
import { CartItem } from '../../../store/cart/cart-model';
import { CartListAction } from '../../../store/cart/cart-actions';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  providers: [FormMapper, CartService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnDestroy {
  private store = inject(Store);
  cartService = inject(CartService);
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
      this.loginService.userLogin(reqBody).pipe(mergeMap(res => {
        const toastMessage = `Welcome Back ${res.result.user.name}`;
        this.showToast(toastMessage, 'success');
        this.showLoader = false;
        this.store.dispatch(UserActions.loggedIn({ user: res?.result?.user }));
        this.storageService.assignItemToSession(sessionKeys.authToken, res?.result?.token);
        const sessionRole = JSON.stringify(res?.result?.user);
        this.storageService.assignItemToSession(sessionKeys.userPerm, sessionRole);
        const userId = jwtDecode(res?.result?.token).sub || '';
        return this.cartService.getCart(userId)
      })).subscribe({
        next: res => {
          res.items = res.items.map(item => this.mapProjectionItems<CartItem>(item, 'instrument'));
          this.store.dispatch(CartListAction.getCartList({ cartId: res.id, cartItems: res.items }));
          const userPerm = JSON.parse(this.storageService.getItemFromSession(sessionKeys.userPerm) || '');
          if (userPerm?.role === 'admin') {
            this.router.navigateByUrl('users');
          } else {
            this.router.navigateByUrl('instruments');
          }
          console.log(res, userPerm.role);
        },
        error: (e) => {
          this.showToast(e.error.message, 'danger');
          this.showLoader = false
        }
      })
    );

    // setTimeout(() => {
    //   this.cartService.getCart('e2575536-1922-4102-8a32-f7386e540ac0').subscribe();
    // }, 20000);
  }

  showToast(message: string, type: string = 'secondary') {
    this.toastService.show({ message, classname: '', delay: 2000 }, type);
  }

  mapProjectionItems<T>(obj: any, propName: string) {
    let newObj: any = {};
    Object.keys(obj).forEach(key => {
      const notPropId = key.toLowerCase() !== (propName.toLowerCase() + 'id');
      const hasPropName = key.toLowerCase().includes(propName.toLowerCase());
      if (notPropId && hasPropName) {
        const newKey = key.replace(propName, '');
        newObj[newKey.toLowerCase()] = obj[key];
      } else {
        newObj[key] = obj[key]
      }
    })
    return newObj as T;
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() })
  }
}
