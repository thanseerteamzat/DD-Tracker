import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbaDetailsComponent } from './dba-details.component';

describe('DbaDetailsComponent', () => {
  let component: DbaDetailsComponent;
  let fixture: ComponentFixture<DbaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
