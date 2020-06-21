import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDataModule } from '../firebase-data/firebase-data.module';
import { FirebaseProductsService } from '../firebase-data/services/products/firebase-products.service';
import { IProductService } from './interfaces/products/products.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseDataModule
  ],
  providers: [
    { provide: IProductService, useExisting: FirebaseProductsService }
  ]
})
export class CoreModule { }
