import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { ToastController } from '@ionic/angular';

import { RestUrlsService } from '../rest-urls.service';

@Component({
  selector: 'app-entry-profile',
  templateUrl: './entry-profile.page.html',
  styleUrls: ['./entry-profile.page.scss'],
})
export class EntryProfilePage implements OnInit {

  private new_user:any = {

    nome:"",
    cpf:"",
    celular:"",
    senha:""
  }

  constructor(private router: Router, 
    private http: HttpClient, 
    private toastController: ToastController,
    private rest_urls: RestUrlsService) { }

  ngOnInit() {
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  goBank(){

    if(this.new_user['nome'].length == 0) {

      this.presentToast("Nome não preenchido.");
      return;
    }

    else if(this.new_user['celular'].length != 11) {

      this.presentToast("Preenchimento de celular incorreto.");
      return;
    }

    else if(this.new_user['cpf'].length != 11) {

      this.presentToast("Preenchimento de CPF incorreto.");
      return;
    }

    else if(this.new_user['senha'].length < 6) {

      this.presentToast("Preenchimento de senha incorreto.");
      return;
    }

    this.http.post(this.rest_urls.rest_urls['usuario'], this.new_user).subscribe(

      (data) => {

        console.log(data);
      },

      (error) => {

        console.log(error);
      }
    );

    //this.router.navigate(['/entry-bank']);
  }

  goBack(){
    this.router.navigate(['/nolog-entry']);
  }
}
