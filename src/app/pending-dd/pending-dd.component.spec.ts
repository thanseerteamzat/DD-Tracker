import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDdComponent } from './pending-dd.component';

describe('PendingDdComponent', () => {
  let component: PendingDdComponent;
  let fixture: ComponentFixture<PendingDdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
