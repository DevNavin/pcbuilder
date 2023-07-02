import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addItemsToCart, removeCartItemByIndexAndType, removeItemByType } from '../shared/products-store/products.actions';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(
    private http: HttpClient
    ) {

     }

  getItems(payload:any) {
    return this.http.get(`../../assets/${payload}`)
  }

}
