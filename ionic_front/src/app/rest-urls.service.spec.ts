import { TestBed } from '@angular/core/testing';

import { RestUrlsService } from './rest-urls.service';

describe('RestUrlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestUrlsService = TestBed.get(RestUrlsService);
    expect(service).toBeTruthy();
  });
});
