import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontInstancePickerComponent } from './font-instance-picker.component';

describe('FontInstancePickerComponent', () => {
  let component: FontInstancePickerComponent;
  let fixture: ComponentFixture<FontInstancePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontInstancePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontInstancePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
