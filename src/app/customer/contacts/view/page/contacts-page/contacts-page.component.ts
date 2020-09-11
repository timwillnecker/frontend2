import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {InputwithdropdownComponent} from '../../../../../widgets/inputwithdropdown/inputwithdropdown.component';
import {AddressComponent} from '../../../components/contactInformation/address/address.component';
import {ContactService} from '../../../application/contact.service';
import {Router} from '@angular/router';
import {Contact, ContactRestResult, ContactSearchResponseRestResult} from '../../../model/Contact';
import {environment} from '../../../../../../environments/environment';
import {MessageService, SelectItem} from 'primeng/api';
import {AuthorizationService} from '../../../../authorization/authorization.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css', '../../../../../custom.css']
})
export class ContactsPageComponent implements OnInit {


  public contactSearchResponseRestResult: ContactSearchResponseRestResult;

  constructor(
      private router: Router,
      private authorizationService: AuthorizationService,
      private http: HttpClient,
      private messageService: MessageService) { }

  ngOnInit() {
    this.loadContactSearchResponse();
  }

  public loadContactSearchResponse() {
    const url = environment.services.customer.query + 'contact/query/contacts';
    const headers = this.authorizationService.header();
    this.http.get<ContactSearchResponseRestResult>(url, {headers: headers})
        .subscribe(response => {
          this.contactSearchResponseRestResult = response;
          if (this.contactSearchResponseRestResult.searchResponses.length > 0) {
            this.messageService.add({sticky: true, severity: 'success', summary: 'Kontakte erfolgreich geladen', detail: 'Anzahl Kontakte: ' + this.contactSearchResponseRestResult.searchResponses.length});
          } else {
            this.messageService.add({severity: 'warn', summary: 'Kontakte erfolgreich geladen', detail: 'Keine Kontakte im System vorhanden'});
          }
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Kontakte konnten nicht geladen werden'});
        });
  }
}
