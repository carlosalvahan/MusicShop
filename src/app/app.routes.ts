import { Routes } from '@angular/router';
import { InstrumentPageComponent } from './components/pages/instrument-page/instrument-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';

export const routes: Routes = [
    {path: '', component: InstrumentPageComponent},
    {path: 'orders', component: OrdersPageComponent},
    {path: 'register', loadComponent: () =>  
        import('./components/pages/register-page/register-page.component').then(r => r.RegisterPageComponent)
    },
    {path: '*', component: OrdersPageComponent}
];
