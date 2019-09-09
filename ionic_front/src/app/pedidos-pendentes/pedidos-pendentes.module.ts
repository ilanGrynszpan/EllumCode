import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidosPendentesPage } from './pedidos-pendentes.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosPendentesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidosPendentesPage]
})
export class PedidosPendentesPageModule {}
