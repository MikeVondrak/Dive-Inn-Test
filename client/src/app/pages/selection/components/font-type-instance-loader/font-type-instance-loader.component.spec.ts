import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontTypeInstanceLoaderComponent } from './font-type-instance-loader.component';

describe('FontTypeInstanceLoaderComponent', () => {
  let component: FontTypeInstanceLoaderComponent;
  let fixture: ComponentFixture<FontTypeInstanceLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontTypeInstanceLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontTypeInstanceLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
