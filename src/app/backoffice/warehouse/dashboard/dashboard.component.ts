import { Component, OnInit } from '@angular/core';
import { BaseAuthService } from 'src/app/core/interfaces/base-auth-service';
import { IProductService } from 'src/app/core/interfaces/products/products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/interfaces/products/product';

@Component({
  selector: 'kmn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public products: Observable<Product[]>;

  constructor(private _authService: BaseAuthService, private _productService: IProductService) { }

  ngOnInit(): void {
    this.products = this._productService.find();
  }

  logout() {
    this._authService.logout();
  }

  async createRandomProduct() {
    const product: Product = {
      basePrice: Math.random() * 10,
      name: 'Pippo'
    }
    const id = await this._productService.create(product);

    alert(`Creato il prodotto con ID: ${id}`);
  }

  deleteProduct(id: string) {
    this._productService.delete(id);
  }

  alertProduct(id: string) {
    this._productService.get(id).subscribe((product: Product) => alert(`${product.id} - ${product.name} - ${product.basePrice}`));
  }
}
