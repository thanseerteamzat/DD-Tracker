import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbaDespListComponent } from './dba-desp-list.component';

describe('DbaDespListComponent', () => {
  let component: DbaDespListComponent;
  let fixture: ComponentFixture<DbaDespListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbaDespListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbaDespListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
