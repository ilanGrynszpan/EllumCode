import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from './rest-urls.service';
import { UserInformationInterfaceService } from './user-information-interface.service';
import { ServicoInformationInterfaceService } from './servico-information-interface.service';


@Injectable({
  providedIn: 'root'
})
export class AccountCreatorService {

  private creation_status:any = { // -1 = error, 0 = not done, 1 = done, 2 = skipped

    user_sign_in: 0,
    bank_info_sent: 0,
    first_service: 0
  };

  private user_data:any = {};

  constructor(private http: HttpClient, 
    private rest_urls: RestUrlsService,
    private user_interface: UserInformationInterfaceService,
    private servico_interface: ServicoInformationInterfaceService,
    private storage: Storage) { }

  user_sign_in(current_creation_status = null, user_data) {

    let creation_status = this.creation_status;
    
    if(current_creation_status != null) {

      creation_status = current_creation_status;
    }

    if(creation_status.user_sign_in == 0) {
      this.user_interface.user_create(user_data).subscribe(

        (valid_response) => {

          this.user_data = valid_response;

          if(valid_response == "no_name_sent" ||
          valid_response == "no_cpf_sent" ||
          valid_response == "no_cellphone_sent" ||
          valid_response == "no_passcode_sent") {

            return({flag: "fill_err", status:creation_status});
          }

          else if(valid_response == "user_cpf_already_registered") {

            return({flag: "ok_cpf_err", status:creation_status});
          }

          else if(valid_response == "user_celular_already_registered") {

            return({flag: "ok_celular_err", status:creation_status});
          }

          else{

            this.storage.set("user_id", valid_response['id_usuario']);
            this.storage.set("cpf", valid_response['cpf']);
            this.storage.set("nome", valid_response['nome']);
            this.storage.set("celular", valid_response['celular']);

            creation_status['user_sign_in'] = 1;
          }

          return({flag: "done", status:creation_status});
        },

        (creation_error) => {

          creation_status['user_sign_in'] = -1;
          return({flag: "err", status:creation_status});
        }
      );
    }

    else {

      creation_status['user_sign_in'] = 0;
      return({flag: "err_or_invalid", status:creation_status});
    }
  }

  user_set_banking(current_creation_status = null, banking_data) {

    let creation_status = this.creation_status;
    
    if(current_creation_status != null) {

      creation_status = current_creation_status;
    }

    if(creation_status.bank_info_sent == 0) {
      if(creation_status.user_sign_in == 1) {
        this.user_interface.user_set_banking_information(this.user_data['id_usuario'], banking_data).subscribe(

          (valid_response) => {

            if(valid_response == "no_bank_was_sent" ||
              valid_response == "no_acc_was_sent" ||
              valid_response == "no_agency_was_sent" ||
              valid_response == "no_banco_input" ||
              valid_response == "no_acc_input" ||
              valid_response == "no_agency_input") {

                return({flag: "fill_err", status:creation_status});
            }

            else if(valid_response == "no_such_user_id_on_records") {

              return({flag: "ok_user_not_found", status:creation_status});
            }
  
            else if(valid_response == "error_user_id_repeated_on_records") {
  
              return({flag: "ok_user_repeated_err", status:creation_status});
            }

            else{

              this.storage.set("banco", valid_response['banco']);
              this.storage.set("agencia", valid_response['agencia']);
              this.storage.set("conta", valid_response['conta']);

              creation_status['bank_info_sent'] = 1;
              this.user_data = valid_response;
            }

            return({flag: "ok", status:creation_status});
          },

          (banking_setup_error) => {

            creation_status['first_service'] = -1;
            return({flag: "err", status:creation_status});
          }
        );
      }

      else {

        creation_status['first_service'] = 0;
        return({flag: "previous_err", status:creation_status});
      }
    }

    else {

      creation_status['first_service'] = 0;
      return({flag: "err_or_invalid", status:creation_status});
    }
  }

  skip_banking(current_creation_status = null) {

    let creation_status = this.creation_status;
    
    if(current_creation_status != null) {

      creation_status = current_creation_status;
    }

    this.storage.set("banco", "");
    this.storage.set("agencia", "");
    this.storage.set("conta", "");
    
    creation_status['bank_info_sent'] = 2;
    return({flag: "ok", status: creation_status});
  }

  user_first_service(current_creation_status = null, servico_data) {

    let creation_status = this.creation_status;
    
    if(current_creation_status != null) {

      creation_status = current_creation_status;
    }

    if(creation_status.first_service == 0) {
      if(creation_status.bank_info_sent == 1) {
        this.servico_interface.servico_create(servico_data).subscribe(

          (valid_response) => {

            this.storage.set("servicos", {

              current_servico_id:valid_response['id_servico'],
              current_servico_name:valid_response['nome_servico'],
              current_servico_area:valid_response['area_atuacao']
            });

            creation_status['first_service'] = 1;
            this.user_data = valid_response;

            return({flag: "ok", status:creation_status});
          },

          (banking_setup_error) => {

            creation_status['first_service'] = -1;
            return({flag: "err", status:creation_status});
          }
        );
      }

      else {

        creation_status['first_service'] = 0;
        return({flag: "previous_err", status:creation_status});
      }
    }

    else {

      creation_status['first_service'] = 0;
      return({flag: "err_or_invalid", status:creation_status});
    }
  }
}
