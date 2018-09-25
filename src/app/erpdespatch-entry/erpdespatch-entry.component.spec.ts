import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpdespatchEntryComponent } from './erpdespatch-entry.component';

describe('ErpdespatchEntryComponent', () => {
  let component: ErpdespatchEntryComponent;
  let fixture: ComponentFixture<ErpdespatchEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErpdespatchEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpdespatchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
