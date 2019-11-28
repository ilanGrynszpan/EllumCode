import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WalletInformationInterfaceService } from './wallet-information-interface.service';

describe('WalletInformationInterfaceService', () => {

  let wallet_test: WalletInformationInterfaceService;
  let servico_test_id: String = "50cf9fe166004e3f898c92160392b868";
  let http_test: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [WalletInformationInterfaceService]
    });
  
    wallet_test = TestBed.get(WalletInformationInterfaceService);
    http_test = TestBed.get(HttpTestingController); 
  });

  it('should be created', () => {
    const service: WalletInformationInterfaceService = TestBed.get(WalletInformationInterfaceService);
    expect(service).toBeTruthy();
  });

  it('should return specific wallet for service id provided as input', () => {
    wallet_test.wallet_retrieve(servico_test_id).subscribe(x => {

      expect(x).toEqual({id_servico:"50cf9fe166004e3f898c92160392b868", id_usuario:"b853ce9d4af44afbadfdbd0099949063", "credito":0.00});
    })
  });
});
