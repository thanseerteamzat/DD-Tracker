import { TestBed, inject } from '@angular/core/testing';

import { AcadamicService } from './acadamic.service';

describe('AcadamicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcadamicService]
    });
  });

  it('should be created', inject([AcadamicService], (service: AcadamicService) => {
    expect(service).toBeTruthy();
  }));
});
