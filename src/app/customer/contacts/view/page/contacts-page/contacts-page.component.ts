import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {InputwithdropdownComponent} from '../../../../../widgets/inputwithdropdown/inputwithdropdown.component';
import {AddressComponent} from '../../../components/contactInformation/address/address.component';
import {ContactService} from '../../../application/contact.service';
import {Router} from '@angular/router';
import {Contact, ContactRestResult} from '../../../model/Contact';
import {environment} from '../../../../../../environments/environment';
import {SelectItem} from 'primeng/api';
import {AuthorizationService} from '../../../../authorization/authorization.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css', '../../../../../custom.css']
})
export class ContactsPageComponent implements OnInit {

  sidebarCreateCustomer = false;

  @ViewChild('address', {static: true, read: ViewContainerRef}) target: ViewContainerRef;
  public componentRef: ComponentRef<any>;

  public contacts: Contact[];

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private contactService: ContactService,
      private router: Router,
      private authorizationService: AuthorizationService,
      private http: HttpClient) { }

  ngOnInit() {
    this.contactService.registerContactsPageComponent(this);
    this.loadContacts();
  }

  public loadContacts() {
    const url = environment.services.customer.query + 'contact/query/allcurrents';
    const headers = this.authorizationService.header();
    this.http.get<ContactRestResult>(url, {headers: headers})
        .subscribe(response => {
          this.contacts = response.contacts;
        });
  }

  public addAddress() {
    const childComponent = this.componentFactoryResolver.resolveComponentFactory(AddressComponent);
    this.componentRef = this.target.createComponent(childComponent);
  }

}
