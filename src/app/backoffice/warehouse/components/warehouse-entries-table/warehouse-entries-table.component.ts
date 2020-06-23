import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { IWarehouseEntry } from 'src/app/core/interfaces/warehouse-entries/warehouse-entry';
import { IWarehouseEntriesService } from 'src/app/core/interfaces/warehouse-entries/warehouse-entries.service';
import { Subscription, ReplaySubject } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { repeatWhen } from 'rxjs/operators';

@Component({
  selector: 'kmn-warehouse-entries-table',
  templateUrl: './warehouse-entries-table.component.html',
  styleUrls: ['./warehouse-entries-table.component.scss']
})
export class WarehouseEntriesTableComponent implements OnInit, OnDestroy {

  @Input()
  public set productId(productId: string) {
    this._productId = productId;
    this._retrieveData();
  }
  public get productId(): string {
    return this._productId;
  }
  private _productId: string;

  @Output() public openUpdateModalClicked: EventEmitter<IWarehouseEntry> = new EventEmitter<IWarehouseEntry>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns: string[] = ['quantity', 'insertDate', 'expired', 'actions'];
  public dataSource = new MatTableDataSource<IWarehouseEntry>([]);
  public entriesMap: Map<string, IWarehouseEntry> = new Map<string, IWarehouseEntry>();

  private _reload: ReplaySubject<void> = new ReplaySubject<void>(1);
  private _dataSubscription: Subscription;

  constructor(private _warehouseEntriesService: IWarehouseEntriesService) { }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this._retrieveData();
  }

  public ngOnDestroy(): void {
    if (this._dataSubscription) this._dataSubscription.unsubscribe();
  }

  public openUpdateModal(id: string) {
    this.openUpdateModalClicked.emit(this.entriesMap.get(id));
  }

  public onDeleteRow(id: string) {
    this._warehouseEntriesService.delete(id);
  }

  public trackBy(index, item: IWarehouseEntry) {
    return item.id;
  }

  private _retrieveData() {
    this._updateDataSource([]);
    if (this._dataSubscription) this._dataSubscription.unsubscribe();

    this._dataSubscription = this._warehouseEntriesService.find({
      productId: this.productId
    })
      .subscribe((stocks: IWarehouseEntry[]) => {
        
        this._updateDataSource(this._setExpiration(stocks));
      });
  }

  private _updateDataSource(data: IWarehouseEntry[]) {
    this.dataSource.data = data;
    this.entriesMap = new Map(data.map(entry => [entry.id, entry]));
  }

  private _setExpiration(stocks: IWarehouseEntry[]): IWarehouseEntry[] {
    return stocks.map(stock => {
      const limit = new Date();
      limit.setHours(0, 0, 0, 0);
      limit.setDate(limit.getDate() - 3);

      stock._expired = stock.insertDate <= limit;
      return stock;
    });
  }
}
