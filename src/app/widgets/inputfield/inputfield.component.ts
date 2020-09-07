import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css'],
  encapsulation: ViewEncapsulation.None

})


export class InputfieldComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  value: any;
  @Output()
  outputValue = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onChangeInputValues() {
    this.outputValue.emit( this.value );
  }

}
