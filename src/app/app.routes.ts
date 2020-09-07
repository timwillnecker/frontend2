import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CustomerContainerComponent} from './customer/customer-container/customer-container.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
    {path: 'customer', component: CustomerContainerComponent, data: {title: 'Kontakte'}}

];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
