import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectusDetailsComponent } from './prospectus-details.component';

describe('ProspectusDetailsComponent', () => {
  let component: ProspectusDetailsComponent;
  let fixture: ComponentFixture<ProspectusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
