import { Injectable } from '@angular/core';
import { IFirebaseDataService } from '../../interfaces/IFirebaseDataService.service';
import { AngularFirestore, DocumentChangeAction, Action, DocumentSnapshot, CollectionReference } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductStock } from 'src/app/core/interfaces/products/product-stock';
import { IFirebaseDataBaseService } from '../../interfaces/firebase-data-base.service';
import { IProductStockFilters } from 'src/app/core/interfaces/products/product-stock-filters';
import { IProduct } from 'src/app/core/interfaces/products/product';
import { IWarehouseEntry } from 'src/app/core/interfaces/warehouse-entries/warehouse-entry';

@Injectable()
export class FirebaseProductStocksService extends IFirebaseDataBaseService<IProductStock> {
  constructor(protected _angularFirestore: AngularFirestore) {
    super();
  }

  public find(filters?: IProductStockFilters): Observable<IProductStock[]> {

    const products$ = this._angularFirestore.collection<IProduct>('products')
      .snapshotChanges();
    const warehouseEntries$ = this._angularFirestore
      .collection<IWarehouseEntry>('warehouse-entries',
        (ref: CollectionReference) => ref
          .where('insertDate', '>', this._getLimitDate())
      )
      .snapshotChanges();

    return combineLatest([products$, warehouseEntries$])
      .pipe(
        map((values: [DocumentChangeAction<IProduct>[], DocumentChangeAction<IWarehouseEntry>[]]) => {
          const quantities = this._calculateQuantities(values[1]);

          const products: IProductStock[] = values[0].map((value: DocumentChangeAction<IProduct>) =>
            ({
              id: value.payload.doc.id,
              ...value.payload.doc.data(),
              quantity: quantities.get(value.payload.doc.id) ?? 0
            }));

          return products
        }));
  }

  private _calculateQuantities(entries: DocumentChangeAction<IWarehouseEntry>[]): Map<string, number> {
    const quantityMap: Map<string, number> = new Map<string, number>();

    entries.forEach(entry => {
      const id = entry.payload.doc.data().productId;
      const quantity = Number(entry.payload.doc.data().quantity);

      if (!quantityMap.has(id)) quantityMap.set(id, 0);

      quantityMap.set(id, quantityMap.get(id) + quantity);
    });

    return quantityMap;
  }

  private _getLimitDate(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    today.setDate(today.getDate() - 3);

    return today;
  }
}