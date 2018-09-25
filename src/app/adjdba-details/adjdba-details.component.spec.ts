import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjdbaDetailsComponent } from './adjdba-details.component';

describe('AdjdbaDetailsComponent', () => {
  let component: AdjdbaDetailsComponent;
  let fixture: ComponentFixture<AdjdbaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjdbaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjdbaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
