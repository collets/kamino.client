import { Injectable } from '@angular/core';
import { IProductService } from 'src/app/core/interfaces/products/products.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/core/interfaces/products/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentChangeAction, Action, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore/interfaces';
import { IFirebaseDataService } from '../../interfaces/IFirebaseDataService.service';

@Injectable()
export class FirebaseProductsService extends IFirebaseDataService<Product> {

  protected COLLECTION_ID: string = 'products';
  
  constructor(protected _angularFirestore: AngularFirestore) {
    super();
  }

  public async create(product: Product): Promise<string> {
    const result = await this._angularFirestore.collection(this.COLLECTION_ID).add(product)

    return result.id;
  }
  public get(id: string): Observable<Product> {
    return this._angularFirestore.collection(this.COLLECTION_ID).doc(id).snapshotChanges()
      .pipe(map((value: Action<DocumentSnapshot<Product>>) => this._addIdToModel(id, value.payload.data())));
  }
  public find(): Observable<Product[]> {
    return this._angularFirestore.collection(this.COLLECTION_ID).snapshotChanges()
      .pipe(map((values: DocumentChangeAction<Product>[]) => values.map((value: DocumentChangeAction<Product>) => this._mapSnapshotToModel(value.payload.doc))));
  }
  public update(product: Product) {
    const id = product.id;
    delete product.id;
    this._angularFirestore.doc(`${this.COLLECTION_ID}/${id}`).update(product);
  }
  public delete(id: string) {
    this._angularFirestore.doc(`${this.COLLECTION_ID}/${id}`).delete();
  }
}
