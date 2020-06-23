import { Observable } from 'rxjs';
import { IDataFilters } from './data-filters';

export interface IDataService<T, F extends IDataFilters> {
    create(product: T): Promise<string>;
    get(id: string): Observable<T>;
    find(filters?: F): Observable<T[]>;
    update(product: T);
    delete(id: string);
}