import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDelayComponent } from './submit-delay.component';

describe('SubmitDelayComponent', () => {
  let component: SubmitDelayComponent;
  let fixture: ComponentFixture<SubmitDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
