import { Injectable } from '@angular/core';

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
  
  constructor() { }
}
