import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdIdEntryComponent } from './dd-id-entry.component';

describe('DdIdEntryComponent', () => {
  let component: DdIdEntryComponent;
  let fixture: ComponentFixture<DdIdEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdIdEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdIdEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
