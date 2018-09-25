import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpdespdetailsComponent } from './erpdespdetails.component';

describe('ErpdespdetailsComponent', () => {
  let component: ErpdespdetailsComponent;
  let fixture: ComponentFixture<ErpdespdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErpdespdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpdespdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
