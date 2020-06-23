import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductStock } from '../products/product-stock';
import { IProductFilters } from '../products/product-filters';

@Injectable()
export abstract class IProductStocksService {
  public abstract find(filters?: IProductFilters): Observable<IProductStock[]>;
}