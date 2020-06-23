import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IWarehouseEntry } from 'src/app/core/interfaces/warehouse-entries/warehouse-entry';

@Component({
  selector: 'kmn-warehouse-entry-dialog',
  templateUrl: './warehouse-entry-dialog.component.html',
  styleUrls: ['./warehouse-entry-dialog.component.scss']
})
export class WarehouseEntryDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<WarehouseEntryDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IWarehouseEntry) { }

  public get quantity() { return this.form.controls.quantity; }
  public get insertDate() { return this.form.controls.insertDate; }

  public ngOnInit(): void {
    this._initForm(this.data);
  }

  public save() {
    const newEntry: IWarehouseEntry = {
      id: this.data?.id,
      productId: this.data.productId,
      quantity: this.form.controls.quantity.value,
      insertDate: this.form.controls.insertDate.value
    }

    this._dialogRef.close(newEntry);
  }

  public close() {
    this._dialogRef.close(null);
  }

  protected _initForm(entry?: IWarehouseEntry) {
    this.form = this._formBuilder.group({
      quantity: [entry?.quantity ?? 1, [Validators.required, Validators.min(1)]],
      insertDate: new FormControl({ value: entry?.insertDate ?? new Date(), disabled: true})
    });
  }

}
