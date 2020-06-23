import { Component, OnInit } from '@angular/core';
import { BaseAuthService } from 'src/app/core/interfaces/base-auth-service';
import { IProductService } from 'src/app/core/interfaces/products/products.service';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/products/product';

import {MatDialog} from '@angular/material/dialog';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';
import { IProductStock } from 'src/app/core/interfaces/products/product-stock';
import { WarehouseEntryDialogComponent } from '../../components/warehouse-entry-dialog/warehouse-entry-dialog.component';
import { IWarehouseEntry } from 'src/app/core/interfaces/warehouse-entries/warehouse-entry';
import { IWarehouseEntriesService } from 'src/app/core/interfaces/warehouse-entries/warehouse-entries.service';

@Component({
  selector: 'kmn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public products: Observable<IProduct[]>;
  public selectedProductId: string;

  constructor(
    private _authService: BaseAuthService,
    private _productService: IProductService,
    private _warehouseEntriesService: IWarehouseEntriesService,
    private _dialog: MatDialog) { }

  public ngOnInit(): void {
    this.products = this._productService.find();
  }

  public addProduct() {
    const dialogRef = this._dialog.open(ProductDialogComponent, {
      width: '450px',
      disableClose: true,
      data: null
    });

    dialogRef.afterClosed().subscribe((product: IProduct) => {
      if (!product) return;

      this._productService.create(product);
    });
  }

  public addEntry(productId?: string) {
    const dialogRef = this._dialog.open(WarehouseEntryDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {
        quantity: 1,
        productId: productId ?? this.selectedProductId,
        insertDate: new Date()
      } as IWarehouseEntry
    });

    dialogRef.afterClosed().subscribe((entry: IWarehouseEntry) => {
      if (!entry) return;

      this._warehouseEntriesService.create(entry);
      this.selectedProductId = entry.productId;
    });
  }

  public openUpdateModal(product: IProduct) {
    const dialogRef = this._dialog.open(ProductDialogComponent, {
      width: '450px',
      disableClose: true,
      data: product
    });

    dialogRef.afterClosed().subscribe((newProduct: IProduct) => {
      if (!newProduct) return;

      this._productService.update(newProduct);
    });
  }

  public openUpdateQuantityModal(entry: IWarehouseEntry) {
    const dialogRef = this._dialog.open(WarehouseEntryDialogComponent, {
      width: '450px',
      disableClose: true,
      data: entry
    });

    dialogRef.afterClosed().subscribe((newEntry: IWarehouseEntry) => {
      if (!newEntry) return;

      this._warehouseEntriesService.update(newEntry);
      this.selectedProductId = newEntry.productId;
    });
  }

  public selectProductStock(productStock: IProductStock) {
    this.selectedProductId = productStock.id;
  }

  public logout() {
    this._authService.logout();
  }
}
