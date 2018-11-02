import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcDespatchnoEntryComponent } from './kkc-despatchno-entry.component';

describe('KkcDespatchnoEntryComponent', () => {
  let component: KkcDespatchnoEntryComponent;
  let fixture: ComponentFixture<KkcDespatchnoEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcDespatchnoEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcDespatchnoEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
