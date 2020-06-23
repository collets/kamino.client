import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IProduct } from 'src/app/core/interfaces/products/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'kmn-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<ProductDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IProduct) { }

  public get name() { return this.form.controls.name; }
  public get basePrice() { return this.form.controls.basePrice; }
  public get ingredients() { return this.form.controls.ingredients; }

  public ngOnInit(): void {
    this._initForm(this.data);
  }

  public save() {
    const newProduct: IProduct = {
      id: this.data?.id,
      name: this.form.controls.name.value,
      basePrice: this.form.controls.basePrice.value,
      ingredients: this.form.controls.ingredients.value
    }

    this._dialogRef.close(newProduct);
  }

  public close() {
    this._dialogRef.close(null);
  }

  protected _initForm(product?: IProduct) {
    this.form = this._formBuilder.group({
      name: [product?.name ?? '', [Validators.required]],
      basePrice: [product?.basePrice ?? 0, [Validators.required]],
      ingredients: [product?.ingredients ?? '', [Validators.required]],
    });
  }

}
