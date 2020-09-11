import { Component, OnInit } from '@angular/core';
import {Address, Contact} from '../../../model/Contact';
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

  public contact: Contact = new Contact();

  public salutations: SelectItem[];
  public selectedSalutation: SelectItem;

  public contactTypes: SelectItem[];
  public selectedContactType: SelectItem;

  public contactSources: SelectItem[];
  public selectedContactSource: SelectItem;

  constructor(private authorizationService: AuthorizationService,
              private http: HttpClient,
              private contactService: ContactService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.loadContactSalutations();
    this.loadContactTypes();
    this.loadContactSources();
    this.contactService.registerContactComponent(this);
  }

  public inputChangeSurname(value: string) {
    this.contact.surname = value;
  }

  public inputChangeFirstname(value: any) {
      this.contact.firstname = value;
  }

  public inputChangeSecondname(value: any) {
    this.contact.secondname = value;
  }

  public inputChangeSalutation(value: SelectItem) {
    if ( value !== undefined) {
      this.contact.salutation = value.value;
    }
  }

  public inputChangeBirthday(value: Date) {
    this.contact.birthday = value;
  }

  public inputChangeContactType(value: SelectItem) {
    if ( value !== undefined) {
      this.contact.contactType = value.value;
    }
  }

  public inputChangeContactSource(value: SelectItem) {
    if ( value !== undefined) {
      this.contact.contactSource = value.value;
    }
  }

  public inputChangeContactComment(value: string) {
    this.contact.comment = value;
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

  public saveContact() {
    if (this.contact.id < 0) {
      this.createContact();
    } else {
      this.editContact();
    }
  }

  public editContact() {
    const url = environment.services.customer.query + 'contact/cmd/event/CHANGED';
    const headers = this.authorizationService.header();
    this.http.put<Contact>(url, this.contact, {headers: headers})
        .subscribe(response => {
          if (response.contactReference !== undefined && response.contactReference !== '') {
            this.router.navigate(['/customer/' + response.contactReference]);
            this.contactService.contactPageComponent.reload(response.contactReference);
            this.messageService.add({severity: 'success', summary: 'Kontakt erfolgreich geändert', detail: response.firstname + ' ' + response.surname});
          } else {
            this.messageService.add({severity: 'error', summary: 'Kontakt konnte nicht geändert werden'});
          }
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Kontakt konnte nicht geändert werden', detail: error});
        });
  }

  public createContact() {
    const url = environment.services.customer.query + 'contact/cmd/event/CREATED';
    const headers = this.authorizationService.header();
    this.http.post<Contact>(url, this.contact, {headers: headers})
        .subscribe(response => {
          if (response.contactReference !== undefined && response.contactReference !== '') {
            this.router.navigate(['/customer/' + response.contactReference]);
            this.contactService.contactPageComponent.reload(response.contactReference);
            this.messageService.add({severity: 'success', summary: 'Kontakt erfolgreich angelegt', detail: response.firstname + ' ' + response.surname});
          } else {
            this.messageService.add({severity: 'error', summary: 'Kontakt konnte nicht angelegt werden'});
          }
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Kontakt konnte nicht angelegt werden', detail: error});
        });
  }


  initContact(contact: Contact) {
    if (contact.id < 0 ) {
      this.contact = new Contact();
      this.contact.salutation = undefined;
      this.contact.contactType = undefined;
      this.contact.contactSource = undefined;
    } else {
      this.contact = contact;
      this.initSalutation();
      this.initContactType();
      this.initContactSource();
    }
  }
}
