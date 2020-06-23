export interface IWarehouseEntry {
    id: string;
    quantity: number;
    productId: string;
    insertDate: Date;
    _expired?: boolean;
}
