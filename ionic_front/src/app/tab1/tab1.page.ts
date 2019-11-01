import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private stored_data:any = {};

  constructor(private router: Router,
    private storage: Storage) {}

    ngOnInit(){
      this.storage.get('id_usuario').then((val) => {
        console.log('user_id is ', val);
        this.stored_data['id_usuario'] = val;
      });

      this.storage.get('nome').then((val) => {
        console.log('user name is ', val);
        this.stored_data['nome'] = val;
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
