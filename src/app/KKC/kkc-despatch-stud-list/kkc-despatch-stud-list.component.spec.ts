import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcDespatchStudListComponent } from './kkc-despatch-stud-list.component';

describe('KkcDespatchStudListComponent', () => {
  let component: KkcDespatchStudListComponent;
  let fixture: ComponentFixture<KkcDespatchStudListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcDespatchStudListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcDespatchStudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
