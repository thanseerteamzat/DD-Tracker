import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcDdVerificationComponent } from './kkc-dd-verification.component';

describe('KkcDdVerificationComponent', () => {
  let component: KkcDdVerificationComponent;
  let fixture: ComponentFixture<KkcDdVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcDdVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcDdVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
