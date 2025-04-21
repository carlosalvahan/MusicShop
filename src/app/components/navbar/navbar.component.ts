import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, TemplateRef, WritableSignal } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../store/user/user-model';
import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { NgbDropdownModule, NgbOffcanvas, NgbTooltip, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../shared/storage/storage-service';
import { UserActions } from '../../store/user/user-actions';
import { sessionKeys } from '../../app.constants';
import { CartDetailComponent } from '../pages/cart-page/cart-detail/cart-detail.component';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../pages/cart-page/services/cart-service';
import { CartListAction } from '../../store/cart/cart-actions';
import { CartItem, CartListState } from '../../store/cart/cart-model';
import { ProjectionMapper } from '../shared/projection-mapper/projection-mapper-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgbDropdownModule, NgbTooltip, CartDetailComponent, CurrencyPipe],
  providers: [CartService, ProjectionMapper],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  platformId = inject(PLATFORM_ID);
  store = inject(Store);
  storageService = inject(StorageService);
  cartService = inject(CartService);
  projectionMapper = inject(ProjectionMapper)

  readonly adminTabs = [
    { label: 'Users', path: '/users' },
    { label: 'Instruments', path: '/instruments' },
    { label: 'Orders', path: '/orders' }
  ];

  readonly guestTabs = [
    { label: 'Instruments', path: '/instruments' },
    { label: 'About us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  readonly loggedInUserTabs = [
    { label: 'Instruments', path: '/instruments' },
    { label: 'Orders', path: '/orders' },
  ];

  navItems = this.guestTabs;
  
  loggedInUser$: Observable<UserModel> = this.store.select('user');
  cart$: Observable<CartListState> = this.store.select('cartList');
  subList: Subscription[] = [];
  sessionUser: string = '';

  constructor(private router: Router, private globalService: StorageService) {
    afterNextRender(() => {
      this.sessionUser = this.storageService.getItemFromSession<string>(sessionKeys.userPerm) || '';
      if (this.sessionUser) {
        this.store.dispatch(UserActions.loggedIn({ user: JSON.parse(this.sessionUser) }));
      }
    });
  }

  ngOnInit() {
    this.subList.push(
      this.loggedInUser$.subscribe(res => {
        switch (res.role) {
          case 'Admin': this.navItems = this.adminTabs; break;
          case 'User': this.navItems = this.loggedInUserTabs; break;
          default: this.navItems = this.guestTabs;
        }
      }),
    );

    if (isPlatformBrowser(this.platformId)) {
      const token = this.storageService.getItemFromSession<string>(sessionKeys.authToken) || '';
      if (token) {
        const userId = jwtDecode(token).sub || '';
        this.subList.push(
          this.cartService.getCart(userId).subscribe({
            next: (res) => {
              // res.items = res.items.map(item => this.mapProjectionItems<CartItem>(item, 'instrument'));
              res.items = res.items.map(item => this.projectionMapper.mapProjectionItems<CartItem>(item, 'instrument'));
              console.log(res.items);
              this.store.dispatch(CartListAction.getCartList({ cartId: res.id, cartItems: res.items }));
            }
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() });
  }

  logoutClicked() {
    this.store.dispatch(UserActions.loggedOut());
    this.globalService.removeItemFromSession(sessionKeys.authToken);
    this.globalService.removeItemFromSession(sessionKeys.userPerm);
    this.store.dispatch(CartListAction.getCartList({ cartId: 0, cartItems: [] }));
    this.navigateTo('login');
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }


  private offcanvasService = inject(NgbOffcanvas);
  closeResult: WritableSignal<string> = signal('');

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }



}
