import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontDisplayTextboxComponent } from './font-display-textbox.component';

describe('FontDisplayTextboxComponent', () => {
  let component: FontDisplayTextboxComponent;
  let fixture: ComponentFixture<FontDisplayTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontDisplayTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontDisplayTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
