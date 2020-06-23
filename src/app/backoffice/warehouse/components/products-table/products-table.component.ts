import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IProductStock } from 'src/app/core/interfaces/products/product-stock';
import { IProductService } from 'src/app/core/interfaces/products/products.service';
import { IProductStocksService } from 'src/app/core/interfaces/product-stocks/product-stocks.service';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/products/product';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'kmn-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnDestroy {

  @Output() public openUpdateModalClicked: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() public openAddQuantityModalClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() public productStockSelected: EventEmitter<IProductStock> = new EventEmitter<IProductStock>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  public displayedColumns: string[] = ['name', 'basePrice', 'quantity', 'actions'];
  public dataSource = new MatTableDataSource<IProductStock>([]);
  public productsMap: Map<string, IProductStock> = new Map<string, IProductStock>();
  public selectedId: string;

  private _subscriptions: Subscription = new Subscription();

  constructor(private _productService: IProductService, private _productStockService: IProductStocksService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this._retrieveData(true);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onDeleteRow(id: string, event: Event) {
    event.stopImmediatePropagation();
    this._productService.delete(id);
  }

  openUpdateModal(id: string, event: Event) {
    event.stopImmediatePropagation();
    this.openUpdateModalClicked.emit(this.productsMap.get(id));
  }

  openAddQuantityModal(id: string, event: Event) {
    event.stopImmediatePropagation();
    this.openAddQuantityModalClicked.emit(id);
  }

  trackBy(index, item: IProductStock) {
    return item.id;
  }

  select(productStock: IProductStock) {
    this.selectedId = productStock.id;
    this.productStockSelected.emit(productStock);
  }

  private _retrieveData(selectFirst?: boolean) {
    const retriever = this._productStockService.find()
      .subscribe((stocks: IProductStock[]) => {        
        if (selectFirst) {
          this.select(stocks[0]);
          selectFirst = false;
        }

        this._updateDataSource(stocks);
      });

    this._subscriptions.add(retriever);
  }

  private _updateDataSource(data: IProductStock[]) {
    this.dataSource.data = data;
    this.productsMap = new Map(data.map(product => [product.id, product]));
  }
}