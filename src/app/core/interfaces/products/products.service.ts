import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { Observable } from 'rxjs';
import { IDataService } from '../data/data.service';
import { IProductFilters } from './product-filters';

@Injectable()
export abstract class IProductService implements IDataService<IProduct, IProductFilters> {
  public abstract create(product: IProduct): Promise<string>;
  public abstract get(id: string): Observable<IProduct>;
  public abstract find(filters?: IProductFilters): Observable<IProduct[]>;
  public abstract update(product: IProduct);
  public abstract delete(id: string);
}
