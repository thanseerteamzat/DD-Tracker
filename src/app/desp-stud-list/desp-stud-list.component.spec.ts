import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespStudListComponent } from './desp-stud-list.component';

describe('DespStudListComponent', () => {
  let component: DespStudListComponent;
  let fixture: ComponentFixture<DespStudListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespStudListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespStudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
