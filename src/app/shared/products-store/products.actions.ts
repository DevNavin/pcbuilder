import { createAction, props } from "@ngrx/store";

export const getItems = createAction('get items',props<{itemType: string}>());
export const getItemsSuccess = createAction('get items success',props<{items: any}>());
export const getItemsError = createAction('get items error');


export const selectItem = createAction('select item',props<{item: any,itemType: string}>());

export const removeItemByType = createAction('remove item by type',props<{itemType: string}>()) ;

export const addItemsToCart = createAction('add items to Cart');

export const removeCartItemByIndexAndType = createAction('remove items from Cart By Index and Type', props<{index: any,itemType?: string}>());

// export const removeCartItemByIndex = createAction('remove items from Cart By Index', props<{index: string}>());

