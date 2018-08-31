import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollnoEntryComponent } from './rollno-entry.component';

describe('RollnoEntryComponent', () => {
  let component: RollnoEntryComponent;
  let fixture: ComponentFixture<RollnoEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollnoEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollnoEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
