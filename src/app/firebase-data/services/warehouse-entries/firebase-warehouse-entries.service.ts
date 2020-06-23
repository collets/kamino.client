import { Injectable } from '@angular/core';
import { IWarehouseEntry } from 'src/app/core/interfaces/warehouse-entries/warehouse-entry';
import { IFirebaseDataService } from '../../interfaces/IFirebaseDataService.service';
import { AngularFirestore, DocumentChangeAction, Action, DocumentSnapshot, CollectionReference, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWarehouseEntryFilters } from 'src/app/core/interfaces/warehouse-entries/warehouse-entry-filters';

@Injectable()
export class FirebaseWarehouseEntriesService extends IFirebaseDataService<IWarehouseEntry, IWarehouseEntryFilters> {

  protected COLLECTION_ID: string = 'warehouse-entries';
  
  constructor(protected _angularFirestore: AngularFirestore) {
    super();
  }

  public async create(entry: IWarehouseEntry): Promise<string> {
    delete entry.id;

    const result = await this._angularFirestore.collection(this.COLLECTION_ID).add(entry)

    return result.id;
  }

  public get(id: string): Observable<IWarehouseEntry> {
    return this._angularFirestore.collection(this.COLLECTION_ID).doc(id).snapshotChanges()
      .pipe(map((value: Action<DocumentSnapshot<IWarehouseEntry>>) => this._addIdToModel(id, value.payload.data())));
  }

  public find(filters?: IWarehouseEntryFilters): Observable<IWarehouseEntry[]> {
    return this._angularFirestore.collection(this.COLLECTION_ID,
        (ref: CollectionReference) => filters?.productId ? ref.where('productId', '==', filters.productId) : null)
      .snapshotChanges()
      .pipe(map((values: DocumentChangeAction<IWarehouseEntry>[]) => values.map((value: DocumentChangeAction<IWarehouseEntry>) => this._mapFirebaseToKamino(value.payload.doc))));
  }

  public update(entry: IWarehouseEntry) {
    const id = entry.id;
    delete entry.id;
    this._angularFirestore.doc(`${this.COLLECTION_ID}/${id}`).update(entry);
  }

  public delete(id: string) {
    this._angularFirestore.doc(`${this.COLLECTION_ID}/${id}`).delete();
  }

  private _mapFirebaseToKamino(snapshot: QueryDocumentSnapshot<IWarehouseEntry>): IWarehouseEntry {
    const firebaseEntry = this._mapSnapshotToModel(snapshot) as any;
    firebaseEntry.insertDate = firebaseEntry.insertDate.toDate();
    return firebaseEntry as IWarehouseEntry;
  }
}
