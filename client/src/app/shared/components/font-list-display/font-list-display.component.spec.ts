import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontListDisplayComponent } from './font-list-display.component';

describe('FontListDisplayComponent', () => {
  let component: FontListDisplayComponent;
  let fixture: ComponentFixture<FontListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
