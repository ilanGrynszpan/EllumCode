import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from './rest-urls.service';
import { UserInformationInterfaceService } from './user-information-interface.service';

@Injectable({
  providedIn: 'root'
})
export class AccountLoginService {

  constructor(private http: HttpClient, 
    private rest_urls: RestUrlsService,
    private user_interface: UserInformationInterfaceService,
    private storage: Storage) { }

  log_in_cpf(user_cpf:String) {

    console.log(user_cpf);

    this.user_interface.user_get_id(user_cpf).subscribe(

      (res) => {

        console.log(res);

        this.user_interface.user_set_logged(res).subscribe(

          (valid_response) => {

            console.log(valid_response);
            return("log_in_done");
          },

          (login_error) => {

            return("log_in_error");
          }
        );
      },

      (cpf_error) => {

        return("cpf_error");
      }
    );
  }
  
}
