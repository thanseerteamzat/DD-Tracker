import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdentryappComponent } from './ddentryapp.component';

describe('DdentryappComponent', () => {
  let component: DdentryappComponent;
  let fixture: ComponentFixture<DdentryappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdentryappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdentryappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
