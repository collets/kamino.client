import { IDataFilters } from '../data/data-filters';

export interface IWarehouseEntryFilters extends IDataFilters {
    productId: string;
}