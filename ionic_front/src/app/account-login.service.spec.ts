import { TestBed } from '@angular/core/testing';

import { AccountLoginService } from './account-login.service';

describe('AccountLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountLoginService = TestBed.get(AccountLoginService);
    expect(service).toBeTruthy();
  });
});
