import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdEntryComponent } from './dd-entry.component';

describe('DdEntryComponent', () => {
  let component: DdEntryComponent;
  let fixture: ComponentFixture<DdEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
