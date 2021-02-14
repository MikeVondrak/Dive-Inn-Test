import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSetNameModalContentComponent } from './new-set-name-modal-content.component';

describe('NewSetNameModalContentComponent', () => {
  let component: NewSetNameModalContentComponent;
  let fixture: ComponentFixture<NewSetNameModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSetNameModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSetNameModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
