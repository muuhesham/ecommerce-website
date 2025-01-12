import { Component , OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, RedirectCommand } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  totalUsers: number = 0;
  totalProducts: number = 0;

  constructor(private productservice: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productservice.getTotalUsers().subscribe((response: any) => {
      this.totalUsers = response.count;
    });

    this.productservice.getTotalProducts().subscribe((response: any) => {
      this.totalProducts = response.count;
    });
  }
  loadProducts(): void {
    this.productservice.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error retrieving products:', error);
      }
    );
  }

  removeproduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productservice.removeProduct(id).subscribe({
        next: (response) => {
          alert(response.msg);
          this.products = this.products.filter((product) => product.id !== id);
          window.location.reload();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete the product.');
        },
      });
    }
  }
}

