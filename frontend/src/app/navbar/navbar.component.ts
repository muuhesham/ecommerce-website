import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  products: any[] = [];
  cartItems: any[] = [];
  totalPrice: number = 0;
  orderStatus: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.logout();
      this.clearCart();
    }
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return this.authService.isLoggedIn();
    }
    return false;
  }

  clearCart() {
    this.cartService.clearCart();
  }

  placeorder() {
    this.orderStatus = 'pending';
    alert('Your order is placed successfully. Status: Pending.');
    this.clearCart();
  }
}
