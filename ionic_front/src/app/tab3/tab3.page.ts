import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private stored_data:any = {

    user:'',
    services:[
      {
        servico: {
          area_atuacao: "",
          nome_servico: ""
        },
        
        carteira: {
          
        }
      }
    ]
  };

  current_service = 0;
  number_of_services = 0;

  constructor(private router: Router,
    private storage: Storage) {}
  
  ngOnInit() {

    this.storage.get('user_info').then((val_user) => {

      this.storage.get('services_info').then((val_services) => {

        this.stored_data.services = val_services;
        this.stored_data.user = val_user.nome;
        this.number_of_services = val_services.length;
      })
    });
  }

  goToEditarServicos(){
    this.router.navigate(['/editar-servicos'])
  }


}
