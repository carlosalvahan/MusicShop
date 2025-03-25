import { afterNextRender, Component, inject, OnDestroy, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../store/user/user-model';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbOffcanvas, NgbTooltip, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../shared/storage/storage-service';
import { UserActions } from '../../store/user/user-actions';
import { sessionKeys } from '../../app.constants';
import { CartDetailComponent } from '../pages/cart-page/cart-detail/cart-detail.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgbDropdownModule, NgbTooltip, CartDetailComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly adminTabs = [
    { label: 'Users', path: '/users' },
    { label: 'Orders', path: '/orders' },
    { label: 'Instruments', path: '/instruments' }
  ];

  readonly guestTabs = [
    { label: 'Instruments', path: '/instruments' },
    { label: 'About us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  readonly loggedInUserTabs = [
    { label: 'Instruments', path: '/instruments' },
    { label: 'Orders', path: '/users' },
  ];

  navItems = this.guestTabs;
  store = inject(Store);
  storageService = inject(StorageService);
  loggedInUser$!: Observable<UserModel>;
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
    this.loggedInUser$ = this.store.select('user');
    this.subList.push(
      this.loggedInUser$.subscribe(res => {
        switch (res.role) {
          case 'Admin': this.navItems = this.adminTabs; break;
          case 'User': this.navItems = this.loggedInUserTabs; break;
          default: this.navItems = this.guestTabs;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() });
  }

  logoutClicked() {
    this.store.dispatch(UserActions.loggedOut());
    this.globalService.removeItemFromSession(sessionKeys.authToken);
    this.globalService.removeItemFromSession(sessionKeys.userPerm);
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
