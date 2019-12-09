import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.page.html',
  styleUrls: ['./fatura.page.scss'],
})
export class FaturaPage implements OnInit {

  public devolucoes:any = [];

  constructor(private router: Router,
    private storage: Storage) { }

  ngOnInit() {

    this.storage.get('devolution_info').then(

      (val) => {

        
        this.devolucoes = val;
      },

      (error) => {

         console.log(error);
      }
    );
  }

  goBack(){
    this.router.navigate(['/tabs/tab1'])
  }

}
