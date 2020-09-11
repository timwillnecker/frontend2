import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ContactService} from '../../../application/contact.service';
import {MessageService, SelectItem} from 'primeng/api';
import {environment} from '../../../../../../environments/environment';
import {AuthorizationService} from '../../../../authorization/authorization.service';
import {HttpClient} from '@angular/common/http';
import {Address, Contact} from '../../../model/Contact';
import {timeout} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css', '../../../../../custom.css'],
    encapsulation: ViewEncapsulation.None
})
export class AddressComponent implements OnInit {

    public address: Address;

    public addressTypes: SelectItem[];
    public selectedAddressType: SelectItem;

    public countries: SelectItem[];
    public selectedCountry: SelectItem;
    public sourceReference: string;


    constructor(private contactService: ContactService,
                private authorizationService: AuthorizationService,
                private http: HttpClient,
                private activatedRoute: ActivatedRoute,
                private messageService: MessageService,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.sourceReference = params['contactReference'];
        });
        this.loadAddressTypes();
        this.loadCountries();
        this.contactService.registerAddressComponent(this);
    }

    public loadAddressTypes() {
        const url = environment.services.customer.query + 'address/query/addresstypes';
        const headers = this.authorizationService.header();
        this.http.get<SelectItem []>(url, {headers: headers})
            .subscribe(response => {
                this.addressTypes = response;
            });
    }

    public loadCountries() {
        const url = environment.services.customer.query + 'address/query/countries';
        const headers = this.authorizationService.header();
        this.http.get<SelectItem []>(url, {headers: headers})
            .subscribe(response => {
                this.countries = response;
            });
    }

    public inputChangeStreet(value: any) {
        if (value !== undefined) {
            this.address.street = value;
        }
    }

    public inputChangeAddressType(value: SelectItem) {
        if (value !== undefined) {
            this.address.addressType = value.value;
        }
    }

    public inputChangeCity(value: any) {
        if (value !== undefined) {
            this.address.city = value;
        }
    }

    public inputChangePostCode(value: any) {
        if (value !== undefined) {
            this.address.postCode = value;
        }
    }

    public inputChangeCountry(value: SelectItem) {
        if (value !== undefined) {
            this.address.country = value.value;
        }
    }

    public editAddress() {
        if (this.address.id === -1) {
            this.createAddress();
        } else {
            this.saveAddress();
        }
    }

    public saveAddress() {
        const headers = this.authorizationService.header();
        const url = environment.services.customer.cmd + 'address/cmd/reference/' + this.sourceReference + '/event/CHANGED';
        this.http.put<Address>(url, this.address, {headers: headers})
            .subscribe(response => {
                this.address = response;
                if (this.address.addressReference !== undefined && this.address.addressReference !== '') {
                    this.router.navigate(['/customer/' + response.sourceReference]);
                    this.contactService.contactPageComponent.reload(response.sourceReference);
                    this.messageService.add({severity: 'success', summary: 'Adresse erfolgreich geändert'});
                } else {
                    this.messageService.add({severity: 'error', summary: 'Fehler beim Ändern der Adresse'});
                }
            }, error => {
                this.messageService.add({severity: 'error', summary: 'Fehler beim Ändern der Adresse'});
                console.log('error' + JSON.stringify(error));
            });
    }

    public createAddress() {
        const headers = this.authorizationService.header();
        const url = environment.services.customer.cmd + 'address/cmd/reference/' + this.sourceReference + '/event/CREATED';
        this.http.post<Address>(url, this.address, {headers: headers})
            .subscribe(response => {
                this.address = response;
                if (this.address.addressReference !== undefined && this.address.addressReference !== '') {
                    this.router.navigate(['/customer/' + response.sourceReference]);
                    this.contactService.contactPageComponent.reload(response.sourceReference);
                    this.messageService.add({severity: 'success', summary: 'Adresse erfolgreich angelegt'});
                } else {
                    this.messageService.add({severity: 'error', summary: 'Fehler beim Anlegen der Adresse'});
                }
            }, error => {
                this.messageService.add({severity: 'error', summary: 'Fehler beim Anlegen der Adresse'});
            });
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
            this.countries.forEach(c => {
                if (c.value === this.address.country) {
                    this.selectedCountry = c;
                }
            });
        }
    }

    public initAddressType() {
        if (this.addressTypes !== undefined) {
            this.addressTypes.forEach(a => {
                if (a.value === this.address.addressType) {
                    this.selectedAddressType = a;
                }
            });
        }
    }
}
