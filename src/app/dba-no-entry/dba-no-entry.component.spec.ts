import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbaNoEntryComponent } from './dba-no-entry.component';

describe('DbaNoEntryComponent', () => {
  let component: DbaNoEntryComponent;
  let fixture: ComponentFixture<DbaNoEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbaNoEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbaNoEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
