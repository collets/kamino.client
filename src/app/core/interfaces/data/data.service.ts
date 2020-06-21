import { Observable } from 'rxjs';

export interface IDataService<T> {
    create(product: T): Promise<string>;
    get(id: string): Observable<T>;
    find(): Observable<T[]>;
    update(product: T);
    delete(id: string);
}