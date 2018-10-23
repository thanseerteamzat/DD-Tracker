import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcDdEntryDetailsComponent } from './kkc-dd-entry-details.component';

describe('KkcDdEntryDetailsComponent', () => {
  let component: KkcDdEntryDetailsComponent;
  let fixture: ComponentFixture<KkcDdEntryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcDdEntryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcDdEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
