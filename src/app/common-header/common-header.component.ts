import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cartItems } from '../shared/products-store/products.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit{
  constructor(
    private router:Router,
    private store: Store
  ){}
  cartItems = [];
  private unsubscribe$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.store.select(cartItems).pipe(takeUntil(this.unsubscribe$)).subscribe(data => this.cartItems = data);
  }

  goToCart(){
    this.router.navigate(['/cart'])
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
