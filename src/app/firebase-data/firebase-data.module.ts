import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseProductsService } from './services/products/firebase-products.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseWarehouseEntriesService } from './services/warehouse-entries/firebase-warehouse-entries.service';
import { FirebaseProductStocksService } from './services/product-stocks/firebase-product-stocks.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ 
    FirebaseProductsService,
    FirebaseWarehouseEntriesService,
    FirebaseProductStocksService
  ]
})
export class FirebaseDataModule { }
