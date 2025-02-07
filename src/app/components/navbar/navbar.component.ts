import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(private router: Router) {}
  readonly adminTabs = [
    {label: 'Users', path: ''},
    {label: 'Orders', path: '/orders'},
    {label: 'Instruments', path: '/instruments'}
  ];

  readonly guestTabs = [
    {label: 'About us', path: ''},
    {label: 'Contact Us', path: '/instruments'},
  ];

  readonly loggedInUserTabs = [
    {label: 'Instruments', path: '/instruments'},
    {label: 'Orders', path: '/orders'},
  ];

  navItems = this.guestTabs;
  ngOnInit() {
    // this.navItems = Object.assign([], this.guestTabs);
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
