import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrohoverificationComponent } from './srohoverification.component';

describe('SrohoverificationComponent', () => {
  let component: SrohoverificationComponent;
  let fixture: ComponentFixture<SrohoverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrohoverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrohoverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
