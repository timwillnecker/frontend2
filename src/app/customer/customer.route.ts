import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsPageComponent} from './contacts/view/page/contacts-page/contacts-page.component';
import {ContactPageComponent} from './contacts/view/page/contact-page/contact-page.component';
import {CustomerContainerComponent} from './customer-container/customer-container.component';

export const customer: Routes = [
    {path: 'customer', component: CustomerContainerComponent, data: {title: 'Lunden'}, children: [
            {path: '', component: ContactsPageComponent, data: {title: 'Kontake'}},
            {path: ':contactReference', component: ContactPageComponent, data: {title: 'WebSDPS - Service Sales - RuW Anfrage'}}
        ]}
];



export const CustomerRoutes: ModuleWithProviders = RouterModule.forRoot(customer);
