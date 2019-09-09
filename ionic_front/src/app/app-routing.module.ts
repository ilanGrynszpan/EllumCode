import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'novo-credito', loadChildren: './novo-credito/novo-credito.module#NovoCreditoPageModule' },
  { path: 'fatura', loadChildren: './fatura/fatura.module#FaturaPageModule' },
  { path: 'pedidos-pendentes', loadChildren: './pedidos-pendentes/pedidos-pendentes.module#PedidosPendentesPageModule' },
  { path: 'editar-servicos', loadChildren: './editar-servicos/editar-servicos.module#EditarServicosPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
