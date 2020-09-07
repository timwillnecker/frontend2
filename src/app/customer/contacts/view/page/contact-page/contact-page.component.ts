import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Address, Contact, ContactRestResult} from '../../../model/Contact';
import {environment} from '../../../../../../environments/environment';
import {MessageService, SelectItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {AuthorizationService} from '../../../../authorization/authorization.service';
import {ContactService} from '../../../application/contact.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css', '../../../../../custom.css'],
  encapsulation: ViewEncapsulation.None

})
export class ContactPageComponent implements OnInit {

  public contact: Contact;
  public contactRestResult: ContactRestResult;
  public salutations: SelectItem[];
  public selectedSalutation: SelectItem;

  public contactType: SelectItem[];
  public selectedContactType: SelectItem;

  public contactSource: SelectItem[];
  public selectedContactSource: SelectItem;

  public countries: SelectItem[];
  public addressTypes: SelectItem[];

  public sidebarCreateAddress = false;
  public sidebarEditContact = false;



  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private authorizationService: AuthorizationService,
              private router: Router,
              private messageService: MessageService,
              private contactService: ContactService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params ) => {
      const contactReference = params['contactReference'];
      this.loadContact(contactReference);
    });
    this.loadSaltutations();
    this.loadContactSource();
    this.loadContactType();
    this.loadAddressTypes();
    this.loadCountry();
  }

  public loadContact(contactReference: string) {
    if (contactReference === '-1') {
      this.contact = new Contact();
      this.editContact(this.contact);
    } else {
      this.loadContactByReference(contactReference);
    }
  }

  public loadContactByReference(contactReference: string) {
    this.contactRestResult = new ContactRestResult();
    const url = environment.services.customer.query + 'contact/query/reference/' + contactReference;
    const headers = this.authorizationService.header();
    this.http.get<ContactRestResult>(url, {headers: headers})
        .subscribe(response => {
          console.log(response);
          this.contactRestResult = response;
          this.contact = this.contactRestResult.contacts[0];
          this.initSalutation();
          this.initContactType();
          this.initContactSource();
          this.initContactBirthday(response.contacts[0]);
        });
  }

  public initSalutation() {
    if (this.salutations !== undefined) {
      this.salutations.forEach( s => {
        if (this.contact.salutation === s.value) {
          this.selectedSalutation = s;
        }
      });
    }
  }
  public initContactType() {
    if (this.contactType !== undefined) {
      this.contactType.forEach( c => {
        if (this.contact.contactType === c.value) {
          this.selectedContactType = c;
        }
      });
    }
  }
  public initContactSource() {
    if (this.contactSource !== undefined) {
      this.contactSource.forEach( c => {
        if (this.contact.contactSource === c.value) {
          this.selectedContactSource = c;
        }
      });
    }
  }


  public loadSaltutations () {
    const url = environment.services.customer.query + 'contact/query/salutations';
    const headers = this.authorizationService.header();
    this.http.get<SelectItem []>(url, {headers: headers})
        .subscribe(response => {
          this.salutations = response;
        });
  }

  public loadAddressTypes() {
    const url = environment.services.customer.query + 'address/query/addresstype';
    const headers = this.authorizationService.header();
    this.http.get<SelectItem []>(url, {headers: headers})
        .subscribe(response => {
          this.addressTypes = response;
        });
  }

  public loadContactSource () {
    const url = environment.services.customer.query + 'contact/query/contactsource';
    const headers = this.authorizationService.header();
    this.http.get<SelectItem []>(url, {headers: headers})
        .subscribe(response => {
          this.contactSource = response;
        });
  }

  public loadCountry() {
    const url = environment.services.customer.query + 'address/query/country';
    const headers = this.authorizationService.header();
    this.http.get<SelectItem []>(url, {headers: headers})
        .subscribe(response => {
          this.countries = response;
        });
  }

  public loadContactType () {
    const url = environment.services.customer.query + 'contact/query/contacttype';
    const headers = this.authorizationService.header();
    this.http.get<SelectItem []>(url, {headers: headers})
        .subscribe(response => {
          this.contactType = response;
        });
  }

  onUpload(event) {
    const formData: FormData = new FormData();
    formData.append('file', event.files[0]);
    const url = environment.services.customer.cmd + 'contact/cmd/upload';
    const headers = this.authorizationService.header();
    this.http.post(url, formData, {headers: headers})
        .subscribe(res => {
          console.log(res);
        });
  }

  saveContact() {
    if (this.contact.id < 0) {
     this.createContact();
    }
  }

  public createContact() {
    const url = environment.services.customer.query + 'contact/cmd/';
    const headers = this.authorizationService.header();
    this.http.post<Contact>(url, this.contact, {headers: headers})
        .subscribe(response => {
          if (response.contactReference !== undefined && response.contactReference !== '') {
            this.router.navigate(['/customer/' + response.contactReference]);
            this.messageService.add({severity: 'success', summary: 'Kontakt erfolgreich angelegt', detail: response.firstname + ' ' + response.surname});
          } else {
            this.messageService.add({severity: 'error', summary: 'Kontakt konnte nicht angelegt werden'});
          }
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Kontakt konnte nicht angelegt werden', detail: error});
        });
  }

  public initContactBirthday(contact: Contact) {
    const a = new Date(Date.parse(contact.birthday.toString()));
    this.contact.birthday = a;
  }

  public getAddressType(addressType: string): string {
    let value = '';
    if (addressType !== undefined && this.addressTypes !== undefined) {
      this.addressTypes.forEach( a => {
        if (addressType === a.value) {
          value = a.label;
        }
      });
    }
    return value.toUpperCase();
  }

  public getCountry(country: string): string {
    let value = '';
    if (country !== undefined && this.countries !== undefined) {
      this.countries.forEach(c => {
        if (country === c.value) {
          value = c.label;
        }
      });
    }
    return value;
  }

  public getSalutation(salutation: string): string {
    let value = '';
    if (salutation !== undefined && this.salutations !== undefined) {
      this.salutations.forEach(c => {
        if (salutation === c.value) {
          value = c.label;
        }
      });
    }
    return value;
  }

  public getContactType(contactType: string): string {
    let value = '';
    if (contactType !== undefined && this.contactType !== undefined) {
      this.contactType.forEach(c => {
        if (contactType === c.value) {
          value = c.label;
        }
      });
    }
    return value.toUpperCase();
  }
  public getContactSource(contactSource: string): string {
    let value = '';
    if (contactSource !== undefined && this.contactSource !== undefined) {
      this.contactSource.forEach(c => {
        if (contactSource === c.value) {
          value = c.label;
        }
      });
    }
    return value;
  }

  public changeAddress(address: Address) {
    this.sidebarCreateAddress = !this.sidebarCreateAddress;
    this.contactService.editAddress(address);
  }

  public addAddress() {
    const address = new Address();
    this.sidebarCreateAddress = !this.sidebarCreateAddress;
    this.contactService.editAddress(address);
  }

  editContact(contact: Contact) {
    this.contactService.editContact(contact);
    this.sidebarEditContact = !this.sidebarEditContact;
  }
}
