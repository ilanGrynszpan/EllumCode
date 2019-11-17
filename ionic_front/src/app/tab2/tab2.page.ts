import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PaymentServiceService } from '../payment-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  my_payments = [];

  results = [];
  nome = "";
  celular = "";
  cpf = "";

  constructor(private payment_service:PaymentServiceService,
    private router: Router,
    private storage: Storage,) {}

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

                this.my_payments.push({
                  "nome_servico":nome_servico,
                  "valor":payment_info['valor'],
                  "id_pagamento":payment_info['id_pagamento']
                });
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
