import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Address, Contact, ContactRestResult} from '../../../model/Contact';
import {environment} from '../../../../../../environments/environment';
import {MessageService, SelectItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {AuthorizationService} from '../../../../authorization/authorization.service';
import {ContactService} from '../../../application/contact.service';
import {ContactComponent} from '../../../components/contactInformation/contact/contact.component';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css', '../../../../../custom.css'],
  encapsulation: ViewEncapsulation.None

})
export class ContactPageComponent implements OnInit {

  public activatedRouteParameter: string;
  public contact: Contact;
  public contactRestResult: ContactRestResult = new ContactRestResult();
  public salutations: SelectItem[];
  public selectedSalutation: SelectItem;

  public contactTypes: SelectItem[];
  public selectedContactType: SelectItem;

  public contactSources: SelectItem[];
  public selectedContactSource: SelectItem;

  public countries: SelectItem[];
  public addressTypes: SelectItem[];

  public sidebarCreateAddress = false;
  public sidebarEditContact = false;



  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private authorizationService: AuthorizationService,
              private contactService: ContactService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params ) => {
      this.activatedRouteParameter = params['contactReference'];
    });
    this.getContact();
    this.loadContactSalutations();
    this.loadContactSources();
    this.loadContactTypes();
    this.loadAddressTypes();
    this.loadCountries();
    this.contactService.registerContactPageCompontent(this);
  }

  public getContact() {
    if (this.activatedRouteParameter !== '-1') {
      this.recreateContact();
    } else {
      this.createContact();
    }
  }

  public createContact() {
    this.editContact(undefined);
  }

  public recreateContact() {
    const url = environment.services.customer.query + 'contact/query/reference/' + this.activatedRouteParameter;
    const headers = this.authorizationService.header();
    this.http.get<ContactRestResult>(url, {headers: headers})
        .subscribe(response => {
          this.contactRestResult = response;
          this.contact = this.contactRestResult.contacts[0];
          this.initSalutation();
          this.initContactType();
          this.initContactSource();
          this.initContactBirthday(this.contactRestResult.contacts[0]);
        });
  }

  public loadContactSalutations () {
    this.contactService.loadContactSalutations().subscribe(response => {
      this.salutations = response;
    });
  }
  public initSalutation() {
    this.selectedSalutation = this.contactService.initSelectedItem(this.salutations, this.contact.salutation);
  }

  public loadContactSources () {
    this.contactService.loadContactSources().subscribe(response => {
      this.contactSources = response;
    });
  }
  public initContactSource() {
    this.selectedContactSource = this.contactService.initSelectedItem(this.contactSources, this.contact.contactSource);
  }

  public loadContactTypes () {
    this.contactService.loadContactTypes().subscribe(response => {
      this.contactTypes = response;
    });
  }
  public initContactType() {
    this.selectedContactType = this.contactService.initSelectedItem(this.contactTypes, this.contact.contactType);
  }

  public loadCountries() {
    this.contactService.loadCountries().subscribe(response => {
      this.countries = response;
    });
  }
  public loadAddressTypes() {
    this.contactService.loadAddressTypes().subscribe(response => {
      this.addressTypes = response;
    });
  }

  public initContactBirthday(contact: Contact) {
    if ( contact !== undefined && contact.birthday !== undefined && contact.birthday !== null) {
      const bDate = new Date(Date.parse(contact.birthday.toString()));
      this.contact.birthday = bDate;
    }
  }

  public getSelectedItemLabel(array: SelectItem[], value: string): string {
    return this.contactService.getSelectedItemLabel(array, value);
  }

  public editAddress(address: Address) {
    if (address === undefined) {
      address = new Address();
    }
    this.sidebarCreateAddress = !this.sidebarCreateAddress;
    this.contactService.editAddress(address);
  }

  public editContact(contact: Contact) {
    if (contact === undefined) {
      contact = new Contact();
    }
    this.sidebarEditContact = !this.sidebarEditContact;
    this.contactService.editContact(contact);
  }

  // onUpload(event) {
  //   const formData: FormData = new FormData();
  //   formData.append('file', event.files[0]);
  //   const url = environment.services.customer.cmd + 'contact/cmd/upload';
  //   const headers = this.authorizationService.header();
  //   this.http.post(url, formData, {headers: headers})
  //       .subscribe(res => {
  //         console.log(res);
  //       });
  // }

  public reload (contactreference: string) {
    this.sidebarEditContact = false;
    this.sidebarCreateAddress = false;
    this.activatedRouteParameter = contactreference;
    this.getContact();
    this.loadContactSalutations();
    this.loadContactSources();
    this.loadContactTypes();
    this.loadAddressTypes();
    this.loadCountries();
    this.contactService.registerContactPageCompontent(this);
  }
}
