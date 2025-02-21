import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../store/user/user-model';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../shared/storage/storage-service';
import { UserActions } from '../../store/user/user-actions';
import { sessionKeys } from '../../app.constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private globalService: StorageService) { }
  readonly adminTabs = [
    { label: 'Users', path: '' },
    { label: 'Orders', path: '/orders' },
    { label: 'Instruments', path: '/instruments' }
  ];

  readonly guestTabs = [
    { label: 'About us', path: '' },
    { label: 'Contact Us', path: '/instruments' },
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
  ngOnInit() {
    this.sessionUser = this.storageService.getItemFromSession<string>(sessionKeys.userPerm) || '';
    if (this.sessionUser) {
      this.store.dispatch(UserActions.loggedIn({ user: JSON.parse(this.sessionUser) }));
    }
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
    this.navigateTo('login');
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
