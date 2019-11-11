import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestUrlsService {

  public base_url = "http://127.0.0.1:8000/";

  public rest_urls: any = {

      usuario: (this.base_url + "usuarios/usuarios/"),
      servico: (this.base_url + "servico/servicos/"),
      carteira: (this.base_url + "carteira/carteiras/"),
      pagamento: (this.base_url + "pagamento/pagamentos/"),
      devolucao: (this.base_url + "devolucao/devolucoes/"),
      conta: (this.base_url + "contas/"),
      credito: (this.base_url + "credito/credits/"),

  };
  
  constructor(private router: Router, 
    private http: HttpClient,
    private storage: Storage) { }

  public getUserInformation(user_id:String) : any {

    console.log("getting info");

    this.http.get(this.rest_urls['usuario'] + user_id + '/get_user_data/').subscribe(

      (data) => {

        console.log(data);
      },

      (error) => {

        console.log(error);
      }
    );
  }
}
