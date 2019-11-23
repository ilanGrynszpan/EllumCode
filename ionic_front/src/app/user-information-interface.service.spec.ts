import { TestBed } from '@angular/core/testing';

import { UserInformationInterfaceService } from './user-information-interface.service';

describe('UserInformationInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserInformationInterfaceService = TestBed.get(UserInformationInterfaceService);
    expect(service).toBeTruthy();
  });
});
