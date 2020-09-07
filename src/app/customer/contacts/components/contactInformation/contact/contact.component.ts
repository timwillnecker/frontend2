import { Component, OnInit } from '@angular/core';
import {Contact} from '../../../model/Contact';
import {MessageService, SelectItem} from 'primeng/api';
import {environment} from '../../../../../../environments/environment';
import {AuthorizationService} from '../../../../authorization/authorization.service';
import {HttpClient} from '@angular/common/http';
import {ContactService} from '../../../application/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contact: Contact;

  public salutations: SelectItem[];
  public selectedSalutation: SelectItem;

  public contactType: SelectItem[];
  public selectedContactType: SelectItem;

  public contactSource: SelectItem[];
  public selectedContactSource: SelectItem;

  constructor(private authorizationService: AuthorizationService,
              private http: HttpClient,
              private contactService: ContactService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.contactService.registerContactComponent(this);
    this.loadSaltutations();
    this.loadContactType();
    this.loadContactSource();
  }

  public loadSaltutations () {
    const url = environment.services.customer.query + 'contact/query/salutations';
    const headers = this.authorizationService.header();
    this.http.get<SelectItem []>(url, {headers: headers})
        .subscribe(response => {
          this.salutations = response;
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

  public loadContactSource () {
    const url = environment.services.customer.query + 'contact/query/contactsource';
    const headers = this.authorizationService.header();
    this.http.get<SelectItem []>(url, {headers: headers})
        .subscribe(response => {
          this.contactSource = response;
        });
  }

  inputChangeSurname(value: any) {
    this.contact.surname = value;
  }

  inputChangeFirstname(value: any) {
    this.contact.firstname = value;
  }

  inputChangeSecondname(value: any) {
    this.contact.secondname = value;
  }

  inputChangeSalutation(value: SelectItem) {
    if ( value !== undefined) {
      this.contact.salutation = value.value;
    }
  }

  inputChangeBirthday(value: Date) {
    this.contact.birthday = value;
  }

  inputChangeContactType(value: SelectItem) {
    if ( value !== undefined) {
      this.contact.contactType = value.value;
    }
  }

  inputChangeContactSource(value: SelectItem) {
    if ( value !== undefined) {
      this.contact.contactSource = value.value;
    }
  }

  inputChangeContactComment(value: string) {
    this.contact.comment = value;
  }

  initContact(contact: Contact) {
    this.contact = contact;
    if (this.contact.id === -1) {
      this.selectedContactSource = undefined;
      this.selectedContactType = undefined;
      this.selectedSalutation = undefined;
    } else {
      this.initContactSource();
      this.initContactType();
      this.initSalutation();
    }
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

  saveContact() {
    if (this.contact.id < 0) {
      this.createContact();
    } else {
      this.editContact();
    }
  }

  private editContact() {
    const url = environment.services.customer.query + 'contact/cmd/';
    const headers = this.authorizationService.header();
    this.http.put<Contact>(url, this.contact, {headers: headers})
        .subscribe(response => {
          if (response.contactReference !== undefined && response.contactReference !== '') {
            this.router.navigate(['/customer/' + response.contactReference]);
            this.messageService.add({severity: 'success', summary: 'Kontakt erfolgreich geändert', detail: response.firstname + ' ' + response.surname});
          } else {
            this.messageService.add({severity: 'error', summary: 'Kontakt konnte nicht geändert werden'});
          }
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Kontakt konnte nicht geändert werden', detail: error});
        });
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
}
