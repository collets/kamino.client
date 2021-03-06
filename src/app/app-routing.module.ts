import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./backoffice/warehouse/warehouse.module').then(m => m.WarehouseModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: '', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
