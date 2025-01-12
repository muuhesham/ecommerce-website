import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-single-product',
  standalone: false,
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent implements OnInit {
  product: any;
  productId: string | null = '';
  selectedSize: string = 'medium';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');

      if (this.productId) {
        this.loadProductDetails(this.productId);
      }
    });
  }

  loadProductDetails(id: string): void {
    this.productService.getProductById(id).subscribe((data: any) => {
      this.product = data;
    });
  }

  addtocart() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('User is not logged in');
      return;
    }

    console.log('Form Data:', {
      productId: this.productId,
      quantity: this.quantity,
      size: this.selectedSize,
      userId: userId,
    });
    console.log('Product ID before sending to backend:', this.productId);

    if (!this.productId) {
      alert('Product ID is missing');
      return;
    }

    const payload = {
      productId: this.productId,
      quantity: this.quantity,
      size: this.selectedSize,
      userId: userId, 
    };

    this.productService.addtocart(payload).subscribe(
      (response) => {
        console.log('Added to cart:', response);
        alert('Product added to cart successfully!');
        const cartItem = {
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          quantity: this.quantity,
          size: this.selectedSize,
        };
        this.cartService.addToCart(cartItem);
      },
      (error) => {
        console.error('Error adding to cart:', error);
        alert(error.error.message || 'Failed to add product to cart.');
      }
    );
  }
}
