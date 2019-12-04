import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { NgZone } from "@angular/core";

import { WalletInformationInterfaceService } from '../wallet-information-interface.service';
import { ServicoInformationInterfaceService } from '../servico-information-interface.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

/*
  
  Classe definidora da página Aba 1 - Carteira. 

  Autor: Ilan Grysnzpann
  Data: 02 de Dezembro de 2019
*/

export class Tab1Page {

  private current_service_index = 0;
  private stored_data:any = {

    user:{
      nome:"",
      id_user: ""
    },
    devolutions:[],
    services:{},
    service_names:[],
    current_service:{},
    current_wallet:{}
  };

  constructor(private router: Router,
    private wallet_service: WalletInformationInterfaceService,
    private servico: ServicoInformationInterfaceService,
    private storage: Storage,
    private zone: NgZone) {}

  /*
  
  Método ngOnInit, inicializa a página requisitando ao Storage e à API as informações necessárias,
  por meio de processos assíncronos.

  Trigger: Início da página
  Resultados esperados: Carregamento de informações de id, nome e serviços e carteiras do usuário.
  Retorno: Não há.
  
  */

    ngOnInit(){

      this.storage.get("user_id").then((id_user) => {

        this.storage.get("nome").then((name) => {

          this.stored_data['user']['nome'] = name;
        });

        console.log("id_usuario = " + id_user);
        this.stored_data['user']['id_user'] = id_user;

        this.servico.servico_get_list(id_user).subscribe(

          (response) => {

            this.storage.set("servicos", response); // salva os serviços no storage

            this.stored_data.current_service = response[0]; // inicia a página no primeiro serviço cadastrado
            this.stored_data.current_service_index = 0;

            for(let service_index = 0; service_index < response.length; service_index++) {

              // carrega todos os serviços do usuário

              this.stored_data['service_names'].push("");

              this.stored_data['service_names'][service_index] = response[service_index]['nome_servico'];
              this.stored_data['services'][service_index] = response[service_index];
            }

            this.wallet_service.wallet_retrieve(response[0]['id_servico']).subscribe(

              (wallet) => {

                this.stored_data['current_wallet']['credito'] = wallet['credito'];
                console.log(wallet['credito']);
              }
            )
          }
        );
      });
    }

  /*
  
  Método onServiceSelected, altera o serviço em exposição na página de carteiras.

  Trigger: seleção de novo serviço
  Resultados esperados: Serviço é alterado e nova carteira é mostrada.
  Retorno: Não há.
  
  */

  onServiceSelected(value) {

    // modifica o serviço utilizado correntemente

    this.stored_data.current_service = this.stored_data.services[value]['servico'];
    this.stored_data.current_Wallet = this.stored_data.services[value]['carteira'];

    console.log(this.stored_data.services[value]['carteira']);
  }

  /*
  
  Método goToNovoCredito, redireciona o usuário à página de novo crédito.

  Trigger: pressionamento de botão Novo Crédito
  Resultados esperados: Usuário é redirecionado.
  Retorno: Não há.
  
  */

  goToNovoCredito(){
    this.router.navigate(['/novo-credito'])
  }

  /*
  
  Método goToFatura, redireciona o usuário à página de fatura.

  Trigger: pressionamento de botão Fatura
  Resultados esperados: Usuário é redirecionado.
  Retorno: Não há.
  
  */

  goToFatura(){
    this.router.navigate(['/fatura'])
  }


}
