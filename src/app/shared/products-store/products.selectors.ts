import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProductsState } from "./products.reducer";


const selectFeature = createFeatureSelector<IProductsState>('products');

export const products = createSelector(
  selectFeature,(state: IProductsState)=>{
      return state.products;
  }
);

export const items = createSelector(
  selectFeature,(state: IProductsState)=>{
      return state.items;
  }
);

export const cartItems = createSelector(
  selectFeature,(state: IProductsState)=>{
      return state.cartItems;
  }
);

export const itemTypes = createSelector(
  selectFeature,(state: IProductsState)=>{
      return state.itemTypes;
  }
);



