import { IDataService } from 'src/app/core/interfaces/data/data.service';
import { Observable } from 'rxjs';
import { IDataFilters } from 'src/app/core/interfaces/data/data-filters';
import { IFirebaseDataBaseService } from './firebase-data-base.service';

export abstract class IFirebaseDataService<T, F extends IDataFilters> extends IFirebaseDataBaseService<T> implements IDataService<T, F> {

    protected abstract COLLECTION_ID: string;

    public abstract create(product: T): Promise<string>;
    public abstract get(id: string): Observable<T>;
    public abstract find(filters: F): Observable<T[]>;
    public abstract update(product: T);
    public abstract delete(id: string);
}