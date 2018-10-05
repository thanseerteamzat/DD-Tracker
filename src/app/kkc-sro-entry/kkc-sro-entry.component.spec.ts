import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcSroEntryComponent } from './kkc-sro-entry.component';

describe('KkcSroEntryComponent', () => {
  let component: KkcSroEntryComponent;
  let fixture: ComponentFixture<KkcSroEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcSroEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcSroEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
