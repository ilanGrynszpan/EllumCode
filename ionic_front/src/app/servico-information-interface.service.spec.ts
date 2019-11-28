import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServicoInformationInterfaceService } from './servico-information-interface.service';

describe('ServicoInformationInterfaceService', () => {

  let servico_test: ServicoInformationInterfaceService;
  let servico_test_id: String = "50cf9fe166004e3f898c92160392b868";
  let http_test: HttpTestingController;

  let expected_return = {
    "id_servico": "50cf9fe166004e3f898c92160392b868",
    "area_atuacao": "master",
    "nome_servico": "service_master_name3558",
    "id_usuario": "b853ce9d4af44afbadfdbd0099949063"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [ServicoInformationInterfaceService]
    });
  
    servico_test = TestBed.get(ServicoInformationInterfaceService);
    http_test = TestBed.get(HttpTestingController); 
  });

  it('should be created', () => {
    const service: ServicoInformationInterfaceService = TestBed.get(ServicoInformationInterfaceService);
    expect(service).toBeTruthy();
  });

  it('should return specific servico for service id provided as input', () => {
    servico_test.servico_retrieve(servico_test_id).subscribe(x => {

      expect(x).toEqual(expected_return);
    })
  });


});
