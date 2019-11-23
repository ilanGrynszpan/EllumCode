import { TestBed } from '@angular/core/testing';

import { WalletInformationInterfaceService } from './wallet-information-interface.service';

describe('WalletInformationInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletInformationInterfaceService = TestBed.get(WalletInformationInterfaceService);
    expect(service).toBeTruthy();
  });
});
