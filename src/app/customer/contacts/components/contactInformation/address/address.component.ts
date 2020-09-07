import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ContactService} from '../../../application/contact.service';
import {MessageService, SelectItem} from 'primeng/api';
import {environment} from '../../../../../../environments/environment';
import {AuthorizationService} from '../../../../authorization/authorization.service';
import {HttpClient} from '@angular/common/http';
import {Address, Contact} from '../../../model/Contact';
import {timeout} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css', '../../../../../custom.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {

  public address: Address;

  addressTypes: SelectItem[];
  selectedAddressType: SelectItem;

  countries: SelectItem[];
  selectedCountry: SelectItem;
  contactReference: string;


  constructor(private contactService: ContactService,
              private authorizationService: AuthorizationService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params ) => {
      this.contactReference = params['contactReference'];
    });
    this.loadAddressTypes();
    this.loadCountry();
    this.contactService.registerAddressComponent(this);
  }

  public loadAddressTypes() {
    const url = environment.services.customer.query + 'address/query/addresstype';
    const headers = this.authorizationService.header();
    this.http.get<SelectItem []>(url, {headers: headers})
        .subscribe(response => {
          this.addressTypes = response;
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

  inputChangeStreet(value: any) {
    if (value !== undefined) { this.address.street = value; }
  }

  inputChangeAddressType(value: SelectItem) {
    if (value !== undefined) { this.address.addressType = value.value;}
  }

  inputChangeCity(value: any) {
    if (value !== undefined) { this.address.city = value; }
  }

  inputChangePostCode(value: any) {
    if (value !== undefined) { this.address.postCode = value; }
  }

  inputChangeCountry(value: SelectItem) {
    if (value !== undefined) { this.address.country = value.value; }
  }

  public addAddressToContact() {
    const headers = this.authorizationService.header();
    const url = environment.services.customer.cmd + 'address/cmd/reference/' + this.contactReference;
    if (this.address.id === -1) {
      this.http.post<Address>(url, this.address, {headers: headers})
          .subscribe(response => {
            this.address = response;
            if ( this.address.addressReference !== undefined && this.address.addressReference !== '') {
              this.messageService.add({severity: 'success', summary: 'Adresse erfolgreich angelegt'});
            } else {
              this.messageService.add({severity: 'error', summary: 'Fehler beim Anlegen der Adresse'});
            }
          }, error => {
            this.messageService.add({severity: 'error', summary: 'Fehler beim Anlegen der Adresse'});
          });
    } else {
      this.http.put<Address>(url, this.address, {headers: headers})
          .subscribe(response => {
            this.address = response;
            if (this.address.addressReference !== undefined && this.address.addressReference !== '') {
              this.messageService.add({severity: 'success', summary: 'Adresse erfolgreich geändert'});
            } else {
              this.messageService.add({severity: 'error', summary: 'Fehler beim Ändern der Adresse'});
            }
          }, error => {
            this.messageService.add({severity: 'error', summary: 'Fehler beim Ändern der Adresse'});
            console.log('error' + JSON.stringify(error));
          });
    }
  }

  public initAddress(address: Address) {
    this.address = address;
      if (this.address.id === -1) {
        this.selectedCountry = undefined;
        this.selectedAddressType = undefined;
      } else {
        this.initAddressType();
        this.initCountry();
    }
  }

  public initCountry() {
    if (this.countries !== undefined) {
      this.countries.forEach( c => {
        if ( c.value === this.address.country ) {
          this.selectedCountry = c;
        }
      });
    }
  }

  public initAddressType() {
    if (this.addressTypes !== undefined) {
      this.addressTypes.forEach( a => {
        if ( a.value === this.address.addressType ) {
          this.selectedAddressType = a;
        }
      });
    }
  }
}
