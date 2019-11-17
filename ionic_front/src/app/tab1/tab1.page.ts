import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private current_service_index = 0;
  private stored_data:any = {

    user:'',
    devolutions:[],
    services:{},
    service_names:[],
    current_service:{},
    current_wallet:{}
  };

  constructor(private router: Router,
    private storage: Storage) {}

    ngOnInit(){
      this.storage.get('user_info').then((val_user) => {

        this.storage.get('devolution_info').then((val_devolution) => {

          this.storage.get('services_info').then((val_services) => {

            this.stored_data['user'] = val_user;
            this.stored_data['devolutions'] = val_devolution;
            this.stored_data['current_service'] = val_services[this.current_service_index]['servico'];
            this.stored_data['current_wallet'] = val_services[this.current_service_index]['carteira'];

            for(let i = 0; i < val_services.length; i++){
              
              let cur_service = val_services[i]; 
              let serv_info = cur_service['servico'];
              let wallet_info = cur_service['carteira'];

              console.log(serv_info['nome_servico']);

              this.stored_data.service_names.push(serv_info['nome_servico']);

              this.stored_data.services[serv_info['nome_servico']] = {};
              this.stored_data.services[serv_info['nome_servico']]['servico'] = serv_info;
              this.stored_data.services[serv_info['nome_servico']]['carteira'] = wallet_info;
              //this.stored_data.services[serv_info['nome_servico']]['servico'] = serv_info;
              //this.stored_data.services[val_services[i]['servico']['nome_servico']]['carteira'] = val_services[i]['carteira']
            }

            console.log(this.stored_data);
            console.log(this.stored_data.current_service);
          });
        });
      })
    }
  
  onServiceSelected(value) {

    this.stored_data.current_service = this.stored_data.services[value]['servico'];
    this.stored_data.current_Wallet = this.stored_data.services[value]['carteira'];

  }

  goToNovoCredito(){
    this.router.navigate(['/novo-credito'])
 }

 goToFatura(){
  this.router.navigate(['/fatura'])
}

goToPedidosPendentes(){
  this.router.navigate(['/pedidos-pendentes'])
}

}
