import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentServiceService } from '../payment-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  results: [];
  nome = "";
  celular = "";
  cpf = "";

  constructor(private payment_service:PaymentServiceService) {}

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
