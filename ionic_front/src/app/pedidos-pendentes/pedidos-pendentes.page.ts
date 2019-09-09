import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.page.html',
  styleUrls: ['./pedidos-pendentes.page.scss'],
})
export class PedidosPendentesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/tabs/tab1'])
  }

  
}
