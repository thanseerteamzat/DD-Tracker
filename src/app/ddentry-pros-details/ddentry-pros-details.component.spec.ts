import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdentryProsDetailsComponent } from './ddentry-pros-details.component';

describe('DdentryProsDetailsComponent', () => {
  let component: DdentryProsDetailsComponent;
  let fixture: ComponentFixture<DdentryProsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdentryProsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdentryProsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
