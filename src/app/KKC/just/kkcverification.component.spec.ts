import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcverificationComponent } from './kkcverification.component';

describe('KkcverificationComponent', () => {
  let component: KkcverificationComponent;
  let fixture: ComponentFixture<KkcverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
