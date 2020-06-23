import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './routes/home/home.component';
import { ShopRoutingModule } from './shop-routing.module';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    CoreModule,
    AuthModule
  ]
})
export class ShopModule { }
