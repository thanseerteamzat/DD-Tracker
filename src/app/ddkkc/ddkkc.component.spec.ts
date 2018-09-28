import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdkkcComponent } from './ddkkc.component';

describe('DdkkcComponent', () => {
  let component: DdkkcComponent;
  let fixture: ComponentFixture<DdkkcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdkkcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdkkcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
