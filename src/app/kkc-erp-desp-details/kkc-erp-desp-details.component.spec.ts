import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcErpDespDetailsComponent } from './kkc-erp-desp-details.component';

describe('KkcErpDespDetailsComponent', () => {
  let component: KkcErpDespDetailsComponent;
  let fixture: ComponentFixture<KkcErpDespDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcErpDespDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcErpDespDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
