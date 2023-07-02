import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { getItems, getItemsSuccess, getItemsError } from './products.actions';
import { ItemsService } from 'src/app/services/items.service';
import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable()
export class ProductEffects {
  getItems$ =  createEffect(() =>
    this.actions$.pipe(
      ofType(getItems),
      switchMap((action) => this.itemsService.getItems(action.itemType).pipe(
        map(data => getItemsSuccess({items: data})),
        catchError(() => of(getItemsError()))
      ))
  ));
  constructor(private actions$: Actions, private itemsService: ItemsService) {

  }
}
