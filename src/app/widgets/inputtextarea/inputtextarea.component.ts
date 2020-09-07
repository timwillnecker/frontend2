import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-inputtextarea',
  templateUrl: './inputtextarea.component.html',
  styleUrls: ['./inputtextarea.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class InputtextareaComponent implements OnInit {

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
