import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdIdVerificationComponent } from './dd-id-verification.component';

describe('DdIdVerificationComponent', () => {
  let component: DdIdVerificationComponent;
  let fixture: ComponentFixture<DdIdVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdIdVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdIdVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
