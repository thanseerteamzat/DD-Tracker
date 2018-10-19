import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SroEntryDetailsComponent } from './sro-entry-details.component';

describe('SroEntryDetailsComponent', () => {
  let component: SroEntryDetailsComponent;
  let fixture: ComponentFixture<SroEntryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SroEntryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SroEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
