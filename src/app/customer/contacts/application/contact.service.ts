import { Injectable } from '@angular/core';
import {Address, Contact} from '../model/Contact';
import {ContactsPageComponent} from '../view/page/contacts-page/contacts-page.component';
import {AddressComponent} from '../components/contactInformation/address/address.component';
import {ContactComponent} from '../components/contactInformation/contact/contact.component';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contact: Contact;
  public contactPage: ContactsPageComponent;
  public addressComponent: AddressComponent;
  public contactComponent: ContactComponent;

  constructor() { }


  public registerContactsPageComponent(contactPage: ContactsPageComponent) {
    this.contactPage = contactPage;
  }
  public registerAddressComponent(addressComponent: AddressComponent) {
    this.addressComponent = addressComponent;
  }
  public registerContactComponent(contactComponent: ContactComponent) {
    this.contactComponent = contactComponent;
  }


  public editAddress(address: Address) {
    this.addressComponent.initAddress(address);
  }

  public editContact(contact: Contact) {
    this.contactComponent.initContact(contact);
  }
}
