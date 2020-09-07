import {Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation} from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-dropdownfield',
  templateUrl: './dropdownfield.component.html',
  styleUrls: ['./dropdownfield.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DropdownfieldComponent implements OnChanges {

  @Input()
  title: string;

  @Input()
  value: SelectItem[];

  @Input()
  selectedValue: SelectItem;
  @Output()
  outputSelectedValue = new EventEmitter<any>();

  constructor() { }

  ngOnChanges() {
    this.outputSelectedValue.emit( this.selectedValue );
  }
}
