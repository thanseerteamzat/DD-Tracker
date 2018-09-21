import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjverificationComponent } from './adjverification.component';

describe('AdjverificationComponent', () => {
  let component: AdjverificationComponent;
  let fixture: ComponentFixture<AdjverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
