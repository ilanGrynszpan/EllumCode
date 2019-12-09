import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ServicoInformationInterfaceService } from '../servico-information-interface.service';


// needs installation of npm install ionic-angular@latest --save

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

/*
  
  Classe definidora da página Aba 3 - Perfil. 
  
  Autor: Ilan Grysnzpann
  Data: 02 de Dezembro de 2019
*/

export class Tab3Page {

  /*
      Variável de dados guardados em storage local.
      O campo services será atualizado toda a vez em que um serviço for adicionado ou deletado.
  */

  public stored_data:any = {

    user: {

      nome: "",
      user_id: ""
    },
    services:[
      {
        
        servico: {
          id_servico: "",
          area_atuacao: "",
          nome_servico: ""
        },
        
      }
    ]
  };

  public tipos_servico:any = [ // tipos de serviço disponíveis para cadastro

    "construção",
    "beleza",
    "doméstico",
    "alimentos",
    "outro"
  ];

  new_service = { // variável para casatro de novo serviço

    area_atuacao:"",
    nome_servico:"",
    id_usuario:""
  }

  delete_selected_service = "";

  current_service = 0;
  number_of_services = 0;

  constructor(private router: Router,
    private storage: Storage,
    private servico_interface: ServicoInformationInterfaceService) {}
  
  /*
  
  Método ngOnInit, inicializa a página requisitando ao Storage e à API as informações necessárias,
  por meio de processos assíncronos.

  Trigger: Início da página
  Resultados esperados: Carregamento de informações de id, nome e serviços e carteiras do usuário.
  Retorno: Não há.
  
  */

  ngOnInit() {

    this.storage.get("user_id").then((id_user) => {

      this.stored_data['user']['user_id'] = id_user;

      this.storage.get("nome").then((name) => {

        this.stored_data['user']['nome'] = name;
      });

      this.storage.get("servicos").then(

        (service_list) => {
          
          for(let service_index = 0; service_index < service_list.length; service_index++) {

            this.stored_data['services'].push(
              {
                servico: {
                  id_servico: "",
                  nome_servico: "",
                  area_atuacao: ""
                }
              }
            )

            this.stored_data['services'][service_index]['servico']['id_servico'] = service_list[service_index]['id_servico'];
            this.stored_data['services'][service_index]['servico']['nome_servico'] = service_list[service_index]['nome_servico'];
            this.stored_data['services'][service_index]['servico']['area_atuacao'] = service_list[service_index]['area_atuacao'];
          }

          console.log(this.stored_data);
        }
      );
    });

    
  }

  /*
  
  Método deletarServico, encaminha um pedido de remoção de serviço para a back_end.

  Trigger: clique da botão Deletar Serviço
  Resultados esperados: Remoção de serviço (caso seja o único serviço, nada será feito).
  Retorno: Não há.
  
  */

  deletarServico() {

    if(this.stored_data.services.length <= 1) {

      return;
    }

    this.servico_interface.servico_delete(this.delete_selected_service).subscribe(

      (deleted_service) => {

        console.log(deleted_service);

        this.servico_interface.servico_get_list(this.stored_data.user.user_id).subscribe( // atualiza lista de serviços

          (service_list) => {

            this.storage.set('servicos', service_list);
            this.stored_data['services'] = [];

            for(let service_index = 0; service_index < service_list.length; service_index++) {

              this.stored_data['services'].push(
                {
                  servico: {
                    id_servico: "",
                    nome_servico: "",
                    area_atuacao: ""
                  }
                }
              )
  
              this.stored_data['services'][service_index]['servico']['id_servico'] = service_list[service_index]['id_servico'];
              this.stored_data['services'][service_index]['servico']['nome_servico'] = service_list[service_index]['nome_servico'];
              this.stored_data['services'][service_index]['servico']['area_atuacao'] = service_list[service_index]['area_atuacao'];
            }
  
            console.log(this.stored_data);
          }
        )
      }
    )
  }

  /*
  
  Método cadastrarServico, requisita criação de novo serviço à interface de serviço.

  Trigger: clique de botão Cadastrar Serviço
  Resultados esperados: Criação de novo serviço.
  Retorno: Não há.
  
  */

  cadastrarServico(){

    this.servico_interface.servico_create({
      id_usuario: this.stored_data.user.user_id,
      area_atuacao: this.new_service.area_atuacao,
      nome_servico: this.new_service.nome_servico
    }).subscribe(

      (created_service) => {

        console.log(created_service);

        this.servico_interface.servico_get_list(this.stored_data.user.user_id).subscribe( // atualiza lista de serviços

          (service_list) => {

            this.storage.set('servicos', service_list);
            this.stored_data['services'] = [];

            for(let service_index = 0; service_index < service_list.length; service_index++) {

              this.stored_data['services'].push(
                {
                  servico: {
                    id_servico: "",
                    nome_servico: "",
                    area_atuacao: ""
                  }
                }
              )
  
              this.stored_data['services'][service_index]['servico']['id_servico'] = service_list[service_index]['id_servico'];
              this.stored_data['services'][service_index]['servico']['nome_servico'] = service_list[service_index]['nome_servico'];
              this.stored_data['services'][service_index]['servico']['area_atuacao'] = service_list[service_index]['area_atuacao'];
            }
  
            console.log(this.stored_data);
          }
        )
      })
  }

  /*
  
  Método auxiliar onSelectedValue, modifica o id do serviço a ser deletado 
  em pressionamento de Deletar SErviço.

  Trigger: mudança de estado de dropdown menu.
  Resultados esperados: Alteração do valor da variável delete_selected_service
  Retorno: Não há.
  
  */

  onSelectedValue(value) {

    this.delete_selected_service = value.detail.value.id_servico;
  }


}
