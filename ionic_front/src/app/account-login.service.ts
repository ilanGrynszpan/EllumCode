import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from './rest-urls.service';
import { UserInformationInterfaceService } from './user-information-interface.service';
import { ServicoInformationInterfaceService } from './servico-information-interface.service';
import { WalletInformationInterfaceService } from './wallet-information-interface.service';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountLoginService {

  constructor(private http: HttpClient, 
    private rest_urls: RestUrlsService,
    private user_interface: UserInformationInterfaceService,
    private service_interface: ServicoInformationInterfaceService,
    private wallet_service: WalletInformationInterfaceService,
    private storage: Storage,
    private router: Router) { }

  /*
  
  Método para efetuar ato de login com as informações passadas

  Trigger: Requisição via login-page
  Resultados esperados: Login via auth_ok do usuário ou erro de login.
  Retorno: "log_in_error", "cpf_error", "auth_ok"
  
  */

  log_in_cpf(user_cpf:String, user_pass:String) {

    console.log(user_cpf);

    this.user_interface.user_get_id(user_cpf).subscribe(

      (res) => {

        console.log(res.user_id);

        this.user_interface.user_auth(res['user_id'], {cpf:user_cpf, senha:user_pass}).subscribe(

          (valid_response) => {

            console.log(valid_response);

            if(valid_response['flag'] == "auth_ok") {

              this.storage.set("cpf", user_cpf).then( // salva CPF em Ionic Storage

                (cpf_saved) => {

                  this.storage.set("user_id", res['user_id']).then( // salva id_usuario em Ionic Storage

                    (uid_saved) => {

                      this.storage.set("nome", res['nome']).then(

                        (name_saved) => {

                          console.log("saved name " + res["nome"]);
                          this.router.navigate(['/tabs/tab1']); // salva nome em Ionic Storage
                        }
                      );
                      
                    }
                  )
                }
              )
            }
          }
        )

        this.user_interface.user_set_logged(res).subscribe(

          (valid_response) => {

           console.log(valid_response);
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
