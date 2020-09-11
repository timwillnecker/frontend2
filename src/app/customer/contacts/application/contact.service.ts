import { Injectable } from '@angular/core';
import {Address, Contact} from '../model/Contact';
import {ContactsPageComponent} from '../view/page/contacts-page/contacts-page.component';
import {AddressComponent} from '../components/contactInformation/address/address.component';
import {ContactComponent} from '../components/contactInformation/contact/contact.component';
import {AuthorizationService} from '../../authorization/authorization.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SelectItem} from 'primeng/api';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {ContactPageComponent} from '../view/page/contact-page/contact-page.component';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public addressComponent: AddressComponent;
  public contactComponent: ContactComponent;
  public contactPageComponent: ContactPageComponent;
  constructor(private authorizationService: AuthorizationService,
              private http: HttpClient) { }

  public registerAddressComponent(addressComponent: AddressComponent) {
    this.addressComponent = addressComponent;
  }

  public registerContactComponent(contactComponent: ContactComponent) {
    this.contactComponent = contactComponent;
  }

  public registerContactPageCompontent(contactPageComponent: ContactPageComponent) {
    this.contactPageComponent = contactPageComponent;
  }

  public editAddress(address: Address) {
    this.addressComponent.initAddress(address);
  }

  public editContact(contact: Contact) {
    if (contact.id < 0) {
      setTimeout(() => {
        this.contactComponent.initContact(contact);
      }, 1000);
    } else {
      this.contactComponent.initContact(contact);
    }
  }

  public loadContactTypes(): Observable<SelectItem[]> {
    const url = environment.services.customer.query + 'contact/query/contacttypes';
    const headers = this.authorizationService.header();
    return this.http.get<SelectItem[]>(url, {headers: headers}).pipe(map(response => {
      return response;
    }));
  }
  public loadContactSalutations(): Observable<SelectItem[]> {
    const url = environment.services.customer.query + 'contact/query/salutations';
    const headers = this.authorizationService.header();
    return this.http.get<SelectItem[]>(url, {headers: headers}).pipe(map(response => {
      return response;
    }));
  }
  public loadContactSources(): Observable<SelectItem[]> {
    const url = environment.services.customer.query + 'contact/query/contactsources';
    const headers = this.authorizationService.header();
    return this.http.get<SelectItem[]>(url, {headers: headers}).pipe(map(response => {
      return response;
    }));
  }
  public loadCountries(): Observable<SelectItem[]> {
    const url = environment.services.customer.query + 'address/query/countries';
    const headers = this.authorizationService.header();
    return this.http.get<SelectItem[]>(url, {headers: headers}).pipe(map(response => {
      return response;
    }));
  }
  public loadAddressTypes(): Observable<SelectItem[]> {
    const url = environment.services.customer.query + 'address/query/addresstypes';
    const headers = this.authorizationService.header();
    return this.http.get<SelectItem[]>(url, {headers: headers}).pipe(map(response => {
      return response;
    }));
  }

  public initSelectedItem(array: SelectItem[], value: string): any {
    let v;
    if (array !== undefined) {
      array.forEach( a => {
        if (value === a.value) {
          v = a;
        }
      });
    }
    return v;
  }
  public getSelectedItemLabel (array: SelectItem[], value: string): string {
    let v = '';
    if (value !== undefined && array !== undefined) {
      array.forEach(c => {
        if (value === c.value) {
          v = c.label;
        }
      });
    }
    return v;
  }

}
