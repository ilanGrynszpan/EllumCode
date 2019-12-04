import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { RestUrlsService } from '../rest-urls.service';
import { AccountLoginService } from "../account-login.service"; 

/*

Página Typescript destinada aos eventos de login na plataforma

Autor: Ilan Grynszpan
Data: Rio de Janeiro, 02 de Dezembro de 2019

Observações: Esta página cuida somente dos aspectos gráficos de tela, as interações de login com back-end
             estão no login-service.

*/

@Component({
  selector: 'app-login-basic',
  templateUrl: './login-basic.page.html',
  styleUrls: ['./login-basic.page.scss'],
})
export class LoginBasicPage implements OnInit {

  private data_pckg = {

    cpf: "", // essa variável será utilizada para o envio de dado de CPF ao back-end
    senha: "" // essa variável será utilizada para o envio de dado de senha ao back-end
  };

  constructor(private router: Router, 
    private http: HttpClient, 
    private rest_urls: RestUrlsService,
    private login_maker: AccountLoginService, // utilizada para o ato de login por login-service
    private storage: Storage) { }

  ngOnInit() {
  }

  /*
  
  Método para requisitar ao login-service que realize o login com as informações passadas

  Trigger: Clique no botão de Entrar
  Resultados esperados: Tentativa de login via login-service.
  Retorno: Nenhum
  
  */

  goLogin(){

    if(this.data_pckg.cpf == '') { // não é tentado o login se nenhum CPF ou senha for fornecido

      console.log("no entry");
      return;
    }

    if(this.data_pckg.senha == '') { // não é tentado o login se nenhum CPF ou senha for fornecido

      console.log("no entry");
      return;
    }

    console.log(this.login_maker.log_in_cpf(this.data_pckg.cpf, this.data_pckg.senha)); /* envia evento de login so back-end,
                                                                    com mostra de resultado no console*/
                                                                    
  }

  /*
  
  Método para retornar à página inicial da plataforma

  Trigger: Clique no botão de voltar
  Resultados esperados: retorno à página inicial
  Retorno: Nenhum
  
  */

  goBack(){

    this.router.navigate(['/nolog-entry']);
  }

}
