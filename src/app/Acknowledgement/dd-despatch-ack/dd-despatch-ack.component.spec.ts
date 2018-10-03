import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdDespatchAckComponent } from './dd-despatch-ack.component';

describe('DdDespatchAckComponent', () => {
  let component: DdDespatchAckComponent;
  let fixture: ComponentFixture<DdDespatchAckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdDespatchAckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdDespatchAckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
