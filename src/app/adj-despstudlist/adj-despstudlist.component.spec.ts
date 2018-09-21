import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjDespstudlistComponent } from './adj-despstudlist.component';

describe('AdjDespstudlistComponent', () => {
  let component: AdjDespstudlistComponent;
  let fixture: ComponentFixture<AdjDespstudlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjDespstudlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjDespstudlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
