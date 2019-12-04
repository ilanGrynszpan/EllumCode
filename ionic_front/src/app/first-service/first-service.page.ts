import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from '../rest-urls.service';

@Component({
  selector: 'app-first-service',
  templateUrl: './first-service.page.html',
  styleUrls: ['./first-service.page.scss'],
})
export class FirstServicePage implements OnInit {

  private tipos_servico:any = [

    "construção",
    "beleza",
    "doméstico",
    "alimentos",
    "outro"
  ]

  private new_service_data:any = {

    "area_atuacao":"",
    "nome_servico":"",
    "id_usuario":""
  }

  constructor(private router: Router,
    private storage: Storage,
    private http: HttpClient, 
    private rest_urls: RestUrlsService) { }

  ngOnInit() {

    this.storage.get('user_id').then(

      (val) => {

        console.log(val);
        this.new_service_data.id_usuario = val;
        return;
      },
      (error) => {

        console.log(error);
        return;
      }
    );
  }

  onSubmit() {

    console.log(this.new_service_data);

    this.http.post(this.rest_urls.rest_urls['servico'], this.new_service_data).subscribe(

      (data) => {

        console.log(data);
        this.router.navigate(['/tabs/tab1']);
      }
    );
  }

}
