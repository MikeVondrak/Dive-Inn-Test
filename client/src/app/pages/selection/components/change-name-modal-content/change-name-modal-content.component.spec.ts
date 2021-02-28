import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNameModalContentComponent } from './change-name-modal-content.component';

describe('ChangeNameModalContentComponent', () => {
  let component: ChangeNameModalContentComponent;
  let fixture: ComponentFixture<ChangeNameModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeNameModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNameModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
