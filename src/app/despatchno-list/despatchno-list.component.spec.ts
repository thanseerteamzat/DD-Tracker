import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespatchnoListComponent } from './despatchno-list.component';

describe('DespatchnoListComponent', () => {
  let component: DespatchnoListComponent;
  let fixture: ComponentFixture<DespatchnoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespatchnoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespatchnoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
