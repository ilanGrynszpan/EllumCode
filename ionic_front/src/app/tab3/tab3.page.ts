import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from '../rest-urls.service';
import { NavController } from 'ionic-angular';

// needs installation of npm install ionic-angular@latest --save

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private stored_data:any = {

    user:'',
    user_id:'',
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

  private tipos_servico:any = [

    "construção",
    "beleza",
    "doméstico",
    "alimentos",
    "outro"
  ];

  new_service = {

    area_atuacao:"",
    nome_servico:""
  }

  current_service = 0;
  number_of_services = 0;

  constructor(private router: Router,
    private storage: Storage,
    private http: HttpClient, 
    private navCtrl: NavController,
    private rest_urls: RestUrlsService) {}
  
  ngOnInit() {

    this.storage.get('user_info').then((val_user) => {

      this.storage.get('services_info').then((val_services) => {

        this.stored_data.services = val_services;
        this.stored_data.user = val_user.id_usuario;
        this.stored_data.user_id = val_user.nome;
        this.number_of_services = val_services.length;
      })
    });
  }

  deletarServico(servico) {


  }

  cadastrarServico(){
    
    this.http.post(this.rest_urls.rest_urls['servico'], this.new_service).subscribe(

      (data) => {

        console.log(data);
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }
    );
  }


}
