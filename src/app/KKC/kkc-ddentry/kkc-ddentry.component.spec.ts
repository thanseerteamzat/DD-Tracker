import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcDdentryComponent } from './kkc-ddentry.component';

describe('KkcDdentryComponent', () => {
  let component: KkcDdentryComponent;
  let fixture: ComponentFixture<KkcDdentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcDdentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcDdentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
