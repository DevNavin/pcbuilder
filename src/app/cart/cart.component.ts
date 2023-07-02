import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { cartItems, items } from '../shared/products-store/products.selectors';
import { removeCartItemByIndexAndType } from '../shared/products-store/products.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartItems: any;
  items: any;
  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.store.select(cartItems).subscribe(data => this.cartItems = data);
    this.store.select(items).subscribe(data => this.items = data);
  }

  getTotal():number{
    let total:number = 0;
    if(this.cartItems.length) {
      this.cartItems.forEach((item: { price: string; })=>{
        total = total + parseInt(item.price);
      })
      return total
    } else {
      return 0;
    }
  }

  removeItem(index:number,type:string) {
    this.store.dispatch(removeCartItemByIndexAndType({index: index, itemType: type}));
  }

}
