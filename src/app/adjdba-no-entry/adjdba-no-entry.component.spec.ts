import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjdbaNoEntryComponent } from './adjdba-no-entry.component';

describe('AdjdbaNoEntryComponent', () => {
  let component: AdjdbaNoEntryComponent;
  let fixture: ComponentFixture<AdjdbaNoEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjdbaNoEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjdbaNoEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
