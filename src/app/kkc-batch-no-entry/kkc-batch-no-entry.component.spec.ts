import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcBatchNoEntryComponent } from './kkc-batch-no-entry.component';

describe('KkcBatchNoEntryComponent', () => {
  let component: KkcBatchNoEntryComponent;
  let fixture: ComponentFixture<KkcBatchNoEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcBatchNoEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcBatchNoEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
