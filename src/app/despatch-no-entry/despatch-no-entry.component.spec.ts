import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespatchNoEntryComponent } from './despatch-no-entry.component';

describe('DespatchNoEntryComponent', () => {
  let component: DespatchNoEntryComponent;
  let fixture: ComponentFixture<DespatchNoEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespatchNoEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespatchNoEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
