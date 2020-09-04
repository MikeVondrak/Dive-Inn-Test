import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontSetSelectorComponent } from './font-set-selector.component';

describe('FontSetSelectorComponent', () => {
  let component: FontSetSelectorComponent;
  let fixture: ComponentFixture<FontSetSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontSetSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontSetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
