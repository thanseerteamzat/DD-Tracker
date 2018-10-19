import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcvtpCenterInvlist2Component } from './kcvtp-center-invlist2.component';

describe('KcvtpCenterInvlist2Component', () => {
  let component: KcvtpCenterInvlist2Component;
  let fixture: ComponentFixture<KcvtpCenterInvlist2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcvtpCenterInvlist2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcvtpCenterInvlist2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
