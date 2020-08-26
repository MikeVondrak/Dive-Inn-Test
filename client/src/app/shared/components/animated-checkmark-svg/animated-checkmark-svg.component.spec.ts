import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedCheckmarkSvgComponent } from './animated-checkmark-svg.component';

describe('AnimatedCheckmarkSvgComponent', () => {
  let component: AnimatedCheckmarkSvgComponent;
  let fixture: ComponentFixture<AnimatedCheckmarkSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedCheckmarkSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedCheckmarkSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
