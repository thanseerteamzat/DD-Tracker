import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdVerificationComponent } from './dd-verification.component';

describe('DdVerificationComponent', () => {
  let component: DdVerificationComponent;
  let fixture: ComponentFixture<DdVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
