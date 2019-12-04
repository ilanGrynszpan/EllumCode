import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { RestUrlsService } from './rest-urls.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/*

Classe de comunicação entre os endpoints de Usuário e o aplicativo

Autor: Ilan Grynszpan
Data: Rio de Janeiro, 02 de Dezembro de 2019

*/

export class UserInformationInterfaceService {

  constructor(private http: HttpClient,
    private rest_urls: RestUrlsService) { }

  /*
  
  Método para obter os dados de um usuário por seu id_usuario

  Parâmetros: id_usuario
  Retorno: dados do usuário em JSON
  
  */

  user_retrieve(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.usuario + user_id + "/").pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para deletar um usuário por seu id_usuario

  Parâmetros: id_usuario
  Retorno: flag
  
  */

  user_delete(user_id:any):Observable<any> {

    return this.http.delete(this.rest_urls.rest_urls.usuario + user_id + "/").pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para criar um usuário

  Parâmetros: grupo chave/valor {

    nome: nome do usuário,
    cpf: CPF do usuário (ainda não pode existir na plataforma)
    senha: senha cadastrada pelo usuário
    celular: celular do usuário (ainda não deve existir na plataforma)
  }
  Retorno: {flag, dados}
  
  */

  user_create(user_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.usuario, user_data).pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para capturar um id_usuario a partir de um CPF

  Parâmetros: CPF
  Retorno: dados do usuário
  
  */

  user_get_id(user_cpf:any):Observable<any> {

    let url = this.rest_urls.rest_urls.usuario + "get_user_id/?cpf=" + user_cpf ;
    console.log(url);

    return this.http.get(url).pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para autenticar usuário através de seu CPF e senha

  Parâmetros: id_usuario, chave/valor {

    cpf: CPF do usuário,
    senha: senha cadastrada
  }
  Retorno: dados do usuário
  
  */

  user_auth(user_id: any, user_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.usuario + user_id + "/auth_user/", user_data).pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para cadastrar informações bancárias do usuário

  Parâmetros: id_usuario, chave/valor {

    banco: instituição bancária na qual o usuário tem conta,
    agência: agência à qual a conta do usuário pertence,
    conta: número de conta corrente do usuário cadastrada.
  }
  Retorno: dados do usuário
  
  */

  user_set_banking_information(user_id:any, bank_data:any):Observable<any> {

    return this.http.post(this.rest_urls.rest_urls.usuario + user_id + "/set_banking_information/", bank_data).pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para logar usuário na plataforma

  Parâmetros: id_usuario
  Retorno: flag
  
  */

  user_set_logged(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.usuario + user_id + "/set_user_logged/").pipe(
      map(res=>res)
    );
  }

  /*
  
  Método para deslogar usuário da platafora\

  Parâmetros: id_usuario
  Retorno: flag
  
  */

  user_set_unlogged(user_id:any):Observable<any> {

    return this.http.get(this.rest_urls.rest_urls.usuario + user_id + "/set_user_unlogged/").pipe(
      map(res=>res)
    );
  }
}
