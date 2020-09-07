import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarfieldComponent } from './calendarfield.component';

describe('CalendarfieldComponent', () => {
  let component: CalendarfieldComponent;
  let fixture: ComponentFixture<CalendarfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
