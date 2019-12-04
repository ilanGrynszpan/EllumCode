import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { RestUrlsService } from './rest-urls.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/*

Classe de comunicação entre os endpoints de Serviço e o aplicativo

Autor: Ilan Grynszpan
Data: Rio de Janeiro, 02 de Dezembro de 2019

*/


export class ServicoInformationInterfaceService {

  constructor(private http: HttpClient,
    private rest_urls: RestUrlsService) { }

  /*
  
  Método para obter os dados de um serviço por seu id_servico

  Parâmetros: id_servico
  Retorno: dados do serviço em JSON
  
  */

  servico_retrieve(servico_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.servico + servico_id + "/").pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para criar um novo serviço a partir de dados a seu respeito

  Parâmetros: objeto chave/valor com chaves {

    nome_servico: nome do serviço,
    id_usuario: id_usuario do seu proprietário,
    area_atuacao: área de atuação do serviço, escolhida de dropdown menu.
  }
  Retorno: serviço requisitado
  
  */

  servico_create(servico_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.servico, servico_data).pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para para deletar um serviço

  Parâmetros: id_servico
  Retorno: {flag, dados}
  
  */

  servico_delete(servico_id:any):Observable<any> {

    return this.http.delete(this.rest_urls.rest_urls.servico + servico_id + "/").pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para listar os serviços de um usuário

  Parâmetros: id_usuario
  Retorno: lista de servicos
  
  */

  servico_get_list(user_id:any):Observable<any> {

    let url = this.rest_urls.rest_urls.servico + "get_service_list/?user_id=" + user_id;
    console.log(url);

    return this.http.get(url).pipe(
      map(res=>res['service_list'])
    );
  }
}
