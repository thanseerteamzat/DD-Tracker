import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjEntryComponent } from './adj-entry.component';

describe('AdjEntryComponent', () => {
  let component: AdjEntryComponent;
  let fixture: ComponentFixture<AdjEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
