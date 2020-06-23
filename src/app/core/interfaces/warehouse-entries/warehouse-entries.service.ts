import { IDataService } from '../data/data.service';
import { IWarehouseEntry } from './warehouse-entry';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IWarehouseEntryFilters } from './warehouse-entry-filters';

@Injectable()
export abstract class IWarehouseEntriesService implements IDataService<IWarehouseEntry, IWarehouseEntryFilters> {
    public abstract create(product: IWarehouseEntry): Promise<string>;
    public abstract get(id: string): Observable<IWarehouseEntry>;
    public abstract find(filters?: IWarehouseEntryFilters): Observable<IWarehouseEntry[]>;
    public abstract update(product: IWarehouseEntry);
    public abstract delete(id: string);
}