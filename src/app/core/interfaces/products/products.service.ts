import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { IDataService } from '../data/data.service';

@Injectable()
export abstract class IProductService implements IDataService<Product> {
  public abstract create(product: Product): Promise<string>;
  public abstract get(id: string): Observable<Product>;
  public abstract find(): Observable<Product[]>;
  public abstract update(product: Product);
  public abstract delete(id: string);
}
