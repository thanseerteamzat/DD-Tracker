import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjpendingddComponent } from './adjpendingdd.component';

describe('AdjpendingddComponent', () => {
  let component: AdjpendingddComponent;
  let fixture: ComponentFixture<AdjpendingddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjpendingddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjpendingddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
