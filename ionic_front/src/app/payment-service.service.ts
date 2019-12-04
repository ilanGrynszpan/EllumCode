import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from './rest-urls.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/*

Classe de comunicação para realização de pagamentos

Autor: Ilan Grynszpan
Data: Rio de Janeiro, 02 de Dezembro de 2019

*/

export class PaymentServiceService {

  constructor(private http: HttpClient,
    private rest_urls: RestUrlsService) { }

 /*
  
  Método para obter os dados de um usuário por seu id_usuario

  Parâmetros: id_usuario
  Retorno: dados do usuário em JSON
  
  */

  fetch_cpf(cpf:any):Observable<any> { // based on code found in https://ionicacademy.com/ionic-4-app-api-calls/

    return this.http.get(this.rest_urls.rest_urls.usuario + "get_user_id/?cpf=" + cpf).pipe(
      map(res=>res)
    );
  }
  
  /*
  
  Método para obter os dados de serviços vinculados a um id_usuario

  Parâmetros: id_usuario
  Retorno: dados de serviço listados em JSON
  
  */

  fetch_services(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.servico + "get_service_list/?user_id=" + user_id).pipe(
      map(res=>res['service_list'])
    );
  }

  /*
  
  Método para obter os dados de cobranças vinculadas a um id_servico

  Parâmetros: id_servico
  Retorno: dados de pagamentos listados em JSON
  
  */

  fetch_my_payments(service_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.pagamento + "get_pending_payments_for_service/?id_servico=" + service_id).pipe(
      map(res=>res['payment_list'])
    );
  }

  /*
  
  Método para autenticar um pagamento por seu id_pagamento (ou seja, pagar uma cobrança)

  Parâmetros: id_pagametno
  Retorno: {flag, dados}
  
  */

  auth_payment(payment_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.pagamento + payment_id + "/auth_payment/").pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para criar nova cobrança

  Parâmetros: dados chave/valor {

    id_pagador: id_servico do serviço que faz a cobrança,
    id_receptor: id_servico do serviço que recebe a cobrança
    valor: valor cobrado
  }
  Retorno: {flag, dados - incluindo id_pagamento gerado}
  
  */

  create_payment(payment_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.pagamento, payment_data).pipe(
      map(res=>res)
    );
  }
}
