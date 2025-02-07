import { Routes } from '@angular/router';
import { InstrumentPageComponent } from './components/pages/instrument-page/instrument-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

export const routes: Routes = [
    {path: '', component: InstrumentPageComponent},
    {path: 'orders', component: OrdersPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: '**', component: OrdersPageComponent}
];
