import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdentryDetailsComponent } from './ddentry-details.component';

describe('DdentryDetailsComponent', () => {
  let component: DdentryDetailsComponent;
  let fixture: ComponentFixture<DdentryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdentryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdentryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
