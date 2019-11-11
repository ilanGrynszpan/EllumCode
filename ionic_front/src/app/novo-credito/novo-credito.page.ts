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
      });
    });
  }

  cadastrarCredito() {

    this.novo_credito.valor = Number(this.novo_credito.valor);
    this.novo_credito.user_id = this.user_id;
    this.novo_credito.servico_id = this.servico_id;

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

  goBack(){
    this.router.navigate(['/tabs/tab1'])
  }
}
