import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {HttpClient, HttpResponse, HttpResponseBase} from '@angular/common/http';
import {AuthorizationService} from '../customer/authorization/authorization.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private messageService: MessageService,
              private http: HttpClient,
              private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.contactService();
  }

  public contactService() {
    const url = environment.services.customer.query + 'contactservice';
    const headers = this.authorizationService.header();
    this.http.get<String>(url,  {headers: headers})
        .subscribe(response => {
          if (response === 'OK') {
            this.messageService.add({severity: 'success', summary: 'Contact-Service', detail: 'online'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Contact-Service', detail: 'offline'});
          }
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Contact-Service' , detail: 'offline'});
        });
  }

}
