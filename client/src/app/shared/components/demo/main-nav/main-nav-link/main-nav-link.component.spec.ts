import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavLinkComponent } from './main-nav-link.component';

describe('MainNavLinkComponent', () => {
  let component: MainNavLinkComponent;
  let fixture: ComponentFixture<MainNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
