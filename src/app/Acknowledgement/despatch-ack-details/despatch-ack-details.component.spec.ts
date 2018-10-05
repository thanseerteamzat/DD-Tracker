import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespatchAckDetailsComponent } from './despatch-ack-details.component';

describe('DespatchAckDetailsComponent', () => {
  let component: DespatchAckDetailsComponent;
  let fixture: ComponentFixture<DespatchAckDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespatchAckDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespatchAckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
