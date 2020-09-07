import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../model/Contact';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})
export class ContactsTableComponent implements OnInit {

  @Input()
  contacts: Contact[];
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.contacts);
  }

  openContact(contactReference: any) {
    this.router.navigate(['/customer/' + contactReference]);
  }
}
