import { TestBed } from '@angular/core/testing';

import { DevolutionInformationInterfaceService } from './devolution-information-interface.service';

describe('DevolutionInformationInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevolutionInformationInterfaceService = TestBed.get(DevolutionInformationInterfaceService);
    expect(service).toBeTruthy();
  });
});
