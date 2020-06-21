import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    CoreModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { }
