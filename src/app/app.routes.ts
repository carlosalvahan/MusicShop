import { Routes } from '@angular/router';
import { InstrumentPageComponent } from './components/pages/instrument-page/instrument-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { adminOnlyRoute } from './app-guards';
import { AboutUsPageComponent } from './components/pages/about-us-page/about-us-page.component';
import { ContactUsPageComponent } from './components/pages/contact-us-page/contact-us-page.component';
import { InstrumentResolver } from './components/pages/instrument-page/instrument-resolver';

export const routes: Routes = [
    {path: '', redirectTo: '/instruments', pathMatch: 'full'},
    {path: 'instruments', component: InstrumentPageComponent},
    {path: 'about', component: AboutUsPageComponent},
    {path: 'contact', component: ContactUsPageComponent},
    {path: 'instruments/:id',
        resolve: {
            instrument: InstrumentResolver
        },
        loadComponent: () => import('./components/pages/instrument-page/instrument-detail/instrument-detail.component').then(x => x.InstrumentDetailComponent)
    },
    {path: 'orders', component: OrdersPageComponent },
    {path: 'checkout', 
        loadComponent: () => import('./components/pages/cart-page/cart-page.component').then(x => x.CartPageComponent)
    },
    {path: 'register', component: RegisterPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'users', component: UsersPageComponent, 
        canActivate:[adminOnlyRoute]
    },
    {path: '**', component: OrdersPageComponent}
];
