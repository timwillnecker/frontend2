import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {ContactService} from '../../customer/contacts/application/contact.service';

@Component({
  selector: 'app-inputwithdropdown',
  templateUrl: './inputwithdropdown.component.html',
  styleUrls: ['./inputwithdropdown.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class InputwithdropdownComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  inputValue: any;
  @Output()
  outputInputValue = new EventEmitter<string>();

  @Input()
  dropdownValue: SelectItem[];

  @Input()
  selectedValue: SelectItem;
  @Output()
  outputSelectedValue = new EventEmitter<string>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onChangeInputValues() {
    this.outputInputValue.emit( this.inputValue );
    this.outputSelectedValue.emit( this.selectedValue.value );
  }

}
