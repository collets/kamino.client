import { QueryDocumentSnapshot } from '@angular/fire/firestore/interfaces';

export abstract class IFirebaseDataBaseService<T> {   

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