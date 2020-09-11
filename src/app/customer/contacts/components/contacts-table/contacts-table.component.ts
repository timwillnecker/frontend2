import {Component, Input, OnInit} from '@angular/core';
import {Contact, ContactSearchResponse, ContactSearchResponseRestResult} from '../../model/Contact';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})
export class ContactsTableComponent implements OnInit {

  @Input()
  contacts: ContactSearchResponse [];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  openContact(contactReference: any) {
    this.router.navigate(['/customer/' + contactReference]);
  }
}
