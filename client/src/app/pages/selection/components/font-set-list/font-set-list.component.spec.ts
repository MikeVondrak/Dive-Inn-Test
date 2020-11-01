import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontSetListComponent } from './font-set-list.component';

describe('FontSetListComponent', () => {
  let component: FontSetListComponent;
  let fixture: ComponentFixture<FontSetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontSetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
