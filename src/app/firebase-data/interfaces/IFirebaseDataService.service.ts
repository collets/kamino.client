import { IDataService } from 'src/app/core/interfaces/data/data.service';
import { Observable } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/firestore/interfaces';

export abstract class IFirebaseDataService<T> implements IDataService<T> {

    protected abstract COLLECTION_ID: string;

    public abstract create(product: T): Promise<string>;
    public abstract get(id: string): Observable<T>;
    public abstract find(): Observable<T[]>;
    public abstract update(product: T);
    public abstract delete(id: string);

    protected _mapSnapshotToModel(snapshot: QueryDocumentSnapshot<T>): T {
        return {
            id: snapshot.id,
            ...snapshot.data()
        };
    }

    protected _addIdToModel(id: string, model: T) {
        return {
            id,
            ...model
        }
    }
}