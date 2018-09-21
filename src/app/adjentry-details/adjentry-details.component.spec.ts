import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjentryDetailsComponent } from './adjentry-details.component';

describe('AdjentryDetailsComponent', () => {
  let component: AdjentryDetailsComponent;
  let fixture: ComponentFixture<AdjentryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjentryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjentryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
