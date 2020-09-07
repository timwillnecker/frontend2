import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputwithdropdownComponent } from './inputwithdropdown.component';

describe('InputwithdropdownComponent', () => {
  let component: InputwithdropdownComponent;
  let fixture: ComponentFixture<InputwithdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputwithdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputwithdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
