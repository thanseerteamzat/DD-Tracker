import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseTwoKkcEntryComponent } from './phase-two-kkc-entry.component';

describe('PhaseTwoKkcEntryComponent', () => {
  let component: PhaseTwoKkcEntryComponent;
  let fixture: ComponentFixture<PhaseTwoKkcEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseTwoKkcEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseTwoKkcEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
