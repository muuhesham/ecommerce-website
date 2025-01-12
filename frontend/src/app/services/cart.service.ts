import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();
  addToCart(item: any) {
    const currentCart = this.cartItems.value;
    this.cartItems.next([...currentCart, item]); }

  getCartItems() {
    return this.cartItems.value;
  }

  clearCart() {
    this.cartItems.next([]); 
  }

  getTotalPrice() {
    return this.cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
