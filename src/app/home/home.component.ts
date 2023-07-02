import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { itemTypes, products } from '../shared/products-store/products.selectors';
import { Store } from '@ngrx/store';
import { addItemsToCart, removeItemByType } from '../shared/products-store/products.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  itemTypes: any;
  products: any;
  constructor(
    private router: Router,
    private store: Store
  ){}
  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {

  this.store.select(products).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
    this.products = data;
  });
  this.store.select(itemTypes).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
    this.itemTypes = data;
  });

 }


  goToItems(value:string){
    this.router.navigate([`/item-list/${value}`]);
  }

  addToCart(){
    this.store.dispatch(addItemsToCart());
  }

  removeItem(key:string) {
    this.store.dispatch(removeItemByType({itemType: key}));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
