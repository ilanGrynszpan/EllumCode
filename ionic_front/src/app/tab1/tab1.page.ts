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
    services:[],
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
            this.stored_data['services'] = val_services;
            this.stored_data['current_service'] = val_services[this.current_service_index]['servico'];
            this.stored_data['current_wallet'] = val_services[this.current_service_index]['carteira'];
          });
        });
      })
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
