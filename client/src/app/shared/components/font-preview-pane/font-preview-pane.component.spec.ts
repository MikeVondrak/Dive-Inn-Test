import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontPreviewPaneComponent } from './font-preview-pane.component';

describe('FontPreviewPaneComponent', () => {
  let component: FontPreviewPaneComponent;
  let fixture: ComponentFixture<FontPreviewPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontPreviewPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontPreviewPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
