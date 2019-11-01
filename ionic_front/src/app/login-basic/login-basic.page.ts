import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { RestUrlsService } from '../rest-urls.service';

@Component({
  selector: 'app-login-basic',
  templateUrl: './login-basic.page.html',
  styleUrls: ['./login-basic.page.scss'],
})
export class LoginBasicPage implements OnInit {

  private data_pckg = {

    cpf: ""
  };

  constructor(private router: Router, 
    private http: HttpClient, 
    private rest_urls: RestUrlsService,
    private storage: Storage) { }

  ngOnInit() {
  }

  goHome(){

    this.http.post(this.rest_urls.rest_urls['usuario'] + '123/auth_user/', this.data_pckg).subscribe(

      (data) => {

        console.log(data);
        this.storage.set('nome', data['nome']);
        this.storage.set('cpf', data['cpf']);
        this.storage.set('celular', data['celular']);
        this.storage.set('id_usuario', data['id_usuario']);
      
        this.router.navigate(['/tabs/tab1']);
      },

      (error) => {

        console.log(error);
      }
    );
  }

  goBack(){
    this.router.navigate(['/nolog-entry']);
  }

}
