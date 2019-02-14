import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDelyComponent } from './submit-dely.component';

describe('SubmitDelyComponent', () => {
  let component: SubmitDelyComponent;
  let fixture: ComponentFixture<SubmitDelyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitDelyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
