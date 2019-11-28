import { TestBed } from '@angular/core/testing';

import { AccountCreatorService } from './account-creator.service';

describe('AccountCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountCreatorService = TestBed.get(AccountCreatorService);
    expect(service).toBeTruthy();
  });
});
