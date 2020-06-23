import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { WarehouseEntriesTableComponent } from './components/warehouse-entries-table/warehouse-entries-table.component';
import { WarehouseEntryDialogComponent } from './components/warehouse-entry-dialog/warehouse-entry-dialog.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ProductsTableComponent,
    ProductDialogComponent,
    WarehouseEntriesTableComponent,
    WarehouseEntryDialogComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    WarehouseRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class WarehouseModule { }
