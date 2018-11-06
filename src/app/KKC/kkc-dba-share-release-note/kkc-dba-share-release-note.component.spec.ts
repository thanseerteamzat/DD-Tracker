import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkcDbaShareReleaseNoteComponent } from './kkc-dba-share-release-note.component';

describe('KkcDbaShareReleaseNoteComponent', () => {
  let component: KkcDbaShareReleaseNoteComponent;
  let fixture: ComponentFixture<KkcDbaShareReleaseNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkcDbaShareReleaseNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkcDbaShareReleaseNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
