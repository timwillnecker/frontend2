import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-calendarfield',
  templateUrl: './calendarfield.component.html',
  styleUrls: ['./calendarfield.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CalendarfieldComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  value: Date;
  @Output()
  outputValue = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }

  onChangeInputValues() {
    this.outputValue.emit( this.value );
  }
}
