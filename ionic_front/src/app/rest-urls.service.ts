import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestUrlsService {

  public base_url = "https://ellumrest.herokuapp.com/";

  public rest_urls: any = {

      usuario: (this.base_url + "usuarios/usuarios/"),
      servico: (this.base_url + "servicos/servicos/"),
      carteira: (this.base_url + "carteira/carteiras/"),
      pagamento: (this.base_url + "pagamentos/pagamentos/"),
      devolucao: (this.base_url + "devolucao/devolucoes/"),
      conta: (this.base_url + "contas/"),
      credito: (this.base_url + "creditos/credits/"),

  };
  
  constructor(private router: Router, 
    private http: HttpClient,
    private storage: Storage) { }

  public getUserInformation(user_id:String) : any {

    console.log("getting info");

    this.http.get(this.rest_urls['usuario'] + user_id + '/get_user_data/').subscribe(

      (data) => {

        console.log(data);

        this.storage.set("user_info", data['usuario']).then(

          (val_user) => {

            this.storage.set("devolution_info", data['devolucoes']).then(

              (val_devs) => {

                return this.storage.set("services_info", data['servicos']);
              }
            );
      
          });
        
        },

          (error) => {

            console.log(error);
          }
        );
      }
  
}
