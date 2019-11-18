import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PaymentServiceService } from '../payment-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  my_payments = [];

  results = [];
  nome = "";
  celular = "";
  cpf = "";

  valor = 0.0;

  current_service = {

    nome: "",
    id_servico: ""
  }

  selected_service = {

    nome: "",
    id_servico: ""
  }

  services = []
  services_dict = {}

  constructor(private payment_service:PaymentServiceService,
    private router: Router,
    private storage: Storage) {}
  
  ngOnInit() {

    this.storage.get('services_info').then(

      (service_list) => {

        for(let i = 0; i < service_list.length; i++){
              
          let cur_service = service_list[i]; 
          let serv_info = cur_service['servico'];
          let nome_servico = serv_info['nome_servico'];
          let id_servico = serv_info['id_servico'];

          this.services.push({

            "nome_servico":nome_servico,
            "id_servico":id_servico
          });

          this.services_dict[nome_servico] = {

            "nome_servico":nome_servico,
            "id_servico":id_servico
          };
        }

        this.current_service.nome = this.services[0].nome_servico;
        this.current_service.id_servico = this.services[0].id_servico;
      }
    ); 
  }

  onPayerSelected(value) {

    this.selected_service.id_servico = value.id_servico;
    this.selected_service.nome = value.nome_servico;

    console.log(this.selected_service);
  }

  onChangeCurrentService(index) {

    this.current_service.nome = this.services_dict[index.detail.value].nome_servico;
    this.current_service.id_servico = this.services_dict[index.detail.value].id_servico;
    console.log(this.current_service);
  }

  process_payment() {

    let payment_data = {

      "id_receptor":this.current_service.id_servico,
      "id_pagador":this.selected_service.id_servico,
      "valor":this.valor
    }

    this.payment_service.create_payment(payment_data).subscribe(

      (status) => {

        console.log(status);
      }
    )
  }

  auth_payment(payment) {

    console.log(payment);
    console.log(this.my_payments);

    this.payment_service.auth_payment(payment.id_pagamento).subscribe(

      (status) => {

        console.log(status);
      }
    );
  }

  paymentReceived() {

    this.storage.get('services_info').then(

      (service_list) => {

        for(let i = 0; i < service_list.length; i++){
              
          let cur_service = service_list[i]; 
          let serv_info = cur_service['servico'];
          let nome_servico = serv_info['nome_servico'];
          let id_servico = serv_info['id_servico'];

          this.payment_service.fetch_my_payments(id_servico).subscribe(

            (payment_info) => {

              if(payment_info == "no_records_found") {

                console.log("you have no payments");
              }

              else {
                console.log(payment_info);

                for(let j = 0; j < payment_info.length; j++){

                  this.my_payments.push({
                    "nome_servico":nome_servico,
                    "valor":payment_info[j]['valor'],
                    "id_pagamento":payment_info[j]['id_pagamento']
                    
                  });
                }
              }
            }
          );
        }
      }
    );
  }

  searchChanged() {

    // Call our service function which returns an Observable
    this.payment_service.fetch_cpf(this.cpf).subscribe(
      (data) => {

        if(data['user_id'] == "wrong_entry") {

          console.log("wrong_entry");
          this.results = []
        }

        else if(data['user_id'] == "cpf_not_found") {

          console.log("cpf_not_found");
          this.results = []
        }

        else {

          this.nome = data['nome'];
          this.celular = data['celular'];

          this.payment_service.fetch_services(data['user_id']).subscribe(

            (data_services) => {

              this.results = data_services; 
            }
          )
        }
      }
    );
  }
}
