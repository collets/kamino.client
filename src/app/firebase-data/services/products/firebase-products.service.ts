import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from 'src/app/core/interfaces/products/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentChangeAction, Action, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore/interfaces';
import { IFirebaseDataService } from '../../interfaces/IFirebaseDataService.service';
import { IProductFilters } from 'src/app/core/interfaces/products/product-filters';

@Injectable()
export class FirebaseProductsService extends IFirebaseDataService<IProduct, IProductFilters> {

  protected COLLECTION_ID: string = 'products';
  
  constructor(protected _angularFirestore: AngularFirestore) {
    super();
  }

  public async create(product: IProduct): Promise<string> {
    delete product.id;
    
    const result = await this._angularFirestore.collection(this.COLLECTION_ID).add(product)

    return result.id;
  }
  public get(id: string): Observable<IProduct> {
    return this._angularFirestore.collection(this.COLLECTION_ID).doc(id).snapshotChanges()
      .pipe(map((value: Action<DocumentSnapshot<IProduct>>) => this._addIdToModel(id, value.payload.data())));
  }
  public find(filters: IProductFilters): Observable<IProduct[]> {
    return this._angularFirestore.collection(this.COLLECTION_ID).snapshotChanges()
      .pipe(map((values: DocumentChangeAction<IProduct>[]) => values.map((value: DocumentChangeAction<IProduct>) => this._mapSnapshotToModel(value.payload.doc))));
  }
  public update(product: IProduct) {
    const id = product.id;
    delete product.id;
    this._angularFirestore.doc(`${this.COLLECTION_ID}/${id}`).update(product);
  }
  public delete(id: string) {
    this._angularFirestore.doc(`${this.COLLECTION_ID}/${id}`).delete();
  }
}
