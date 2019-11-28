import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserInformationInterfaceService } from './user-information-interface.service';

describe('UserInformationInterfaceService', () => {

  let user_test: UserInformationInterfaceService;
  let http_test: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [UserInformationInterfaceService]
    });
  
    user_test = TestBed.get(UserInformationInterfaceService);
    http_test = TestBed.get(HttpTestingController); 
  });

  it('should be created', () => {
    const service: UserInformationInterfaceService = TestBed.get(UserInformationInterfaceService);
    expect(service).toBeTruthy();
  });
});
