import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  category: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'] || null;
      if (this.category) {
        this.loadProductsByCategory(this.category);
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error retrieving products:', error);
      }
    );
  }

  loadProductsByCategory(category: string): void {
    this.productService.getProductByCategory(category).subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error retrieving products by category:', error);
      }
    );
  }
}
