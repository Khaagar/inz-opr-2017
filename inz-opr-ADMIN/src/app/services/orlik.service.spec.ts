import { TestBed, inject } from '@angular/core/testing';

import { OrlikService } from './orlik.service';

describe('OrlikService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrlikService]
    });
  });

  it('should be created', inject([OrlikService], (service: OrlikService) => {
    expect(service).toBeTruthy();
  }));
});
