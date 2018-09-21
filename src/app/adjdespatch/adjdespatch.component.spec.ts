import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjdespatchComponent } from './adjdespatch.component';

describe('AdjdespatchComponent', () => {
  let component: AdjdespatchComponent;
  let fixture: ComponentFixture<AdjdespatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjdespatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjdespatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
