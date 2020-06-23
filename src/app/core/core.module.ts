import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDataModule } from '../firebase-data/firebase-data.module';
import { FirebaseProductsService } from '../firebase-data/services/products/firebase-products.service';
import { IProductService } from './interfaces/products/products.service';
import { IProductStocksService } from './interfaces/product-stocks/product-stocks.service';
import { FirebaseProductStocksService } from '../firebase-data/services/product-stocks/firebase-product-stocks.service';
import { IWarehouseEntriesService } from './interfaces/warehouse-entries/warehouse-entries.service';
import { FirebaseWarehouseEntriesService } from '../firebase-data/services/warehouse-entries/firebase-warehouse-entries.service';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseDataModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],  
  providers: [
    { provide: IProductService, useExisting: FirebaseProductsService },
    { provide: IProductStocksService, useExisting: FirebaseProductStocksService },
    { provide: IWarehouseEntriesService, useExisting: FirebaseWarehouseEntriesService }
  ]
})
export class CoreModule { }
