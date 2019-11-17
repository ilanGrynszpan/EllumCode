import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from '../rest-urls.service';

@Component({
  selector: 'app-novo-credito',
  templateUrl: './novo-credito.page.html',
  styleUrls: ['./novo-credito.page.scss'],
})
export class NovoCreditoPage implements OnInit {

  user_id:any = "";
  servico_id:any = "";
  current_service_name = "";

  service_list:any = {};
  service_names:any = [];

  novo_credito:any = {

    servico_id: this.servico_id,
    user_id: this.user_id,
    valor: 0.00
  }

  constructor(private router: Router,
    private storage: Storage,
    private http: HttpClient, 
    private rest_urls: RestUrlsService) { }

  ngOnInit() {

    this.storage.get('user_info').then((val_user) => {

      this.storage.get('services_info').then((val_services) => {

        this.user_id = val_user['id_usuario'];
        this.servico_id = val_services[0]['servico']['id_servico'];
        this.servico_id = val_services[0]['servico']['nome_servico'];
      
        for(let i = 0; i < val_services.length; i++){
          
          let cur_service = val_services[i]; 
          let serv_info = cur_service['servico'];
          let wallet_info = cur_service['carteira'];

          this.service_names.push(serv_info['nome_servico']);
          this.service_list[serv_info['nome_servico']] = {};
          this.service_list[serv_info['nome_servico']]['servico'] = serv_info;
          this.service_list[serv_info['nome_servico']]['carteira'] = wallet_info;
        }
      });
    });
  }

  cadastrarCredito() {

    this.novo_credito.valor = Number(this.novo_credito.valor);
    this.novo_credito.user_id = this.user_id;
    this.novo_credito.servico_id = this.servico_id;

    console.log(this.novo_credito);

    this.http.post(this.rest_urls.rest_urls['credito'], this.novo_credito).subscribe(

      (data) => {

        console.log(data);
        this.router.navigate(['/tabs/tab1']);
      },

      (error) => {

        console.log(error);
        this.router.navigate(['/tabs/tab1']);
      }
    );
  }

  onServiceSelected(value) {

    this.current_service_name = value;
    console.log(this.current_service_name);
    console.log(this.service_list[value]['servico']);
    this.servico_id = this.service_list[value]['servico']['id_servico'];

  }

  goBack(){
    this.router.navigate(['/tabs/tab1'])
  }
}
