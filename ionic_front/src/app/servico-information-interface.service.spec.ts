import { TestBed } from '@angular/core/testing';

import { ServicoInformationInterfaceService } from './servico-information-interface.service';

describe('ServicoInformationInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicoInformationInterfaceService = TestBed.get(ServicoInformationInterfaceService);
    expect(service).toBeTruthy();
  });
});
