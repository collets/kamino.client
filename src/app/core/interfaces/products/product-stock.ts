import { IProduct } from './product';

export interface IProductStock extends IProduct {
    quantity: number;
}