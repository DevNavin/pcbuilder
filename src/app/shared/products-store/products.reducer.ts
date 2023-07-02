import { state } from "@angular/animations";
import { addItemsToCart , getItemsSuccess, removeCartItemByIndexAndType, removeItemByType, selectItem } from "./products.actions";
import { createReducer, on } from "@ngrx/store";


export interface IProductsState {
  products: any;
  cartItems: any;
  items: any;
  itemTypes: string[]
}

export const initialState: IProductsState = {
  products: {
    motherBoard: {
      title: 'Mother Board',
      selected: null,
      route: '0',
      image: "../../assets/motherboard.jpg",
    },
    CPU : {
      title: 'CPU',
      selected: null,
      route: '1',
      image: "../../assets/cpu.jpg",
    },
    RAM: {
      title: "RAM",
      selected: null,
      route: '2',
      image: "../../assets/ram.jpg",
    }
  },
  cartItems: [],
  items: [],
  itemTypes: ["motherBoard","CPU","RAM"]
}

export const productsStateReducer = createReducer(initialState,

  on(getItemsSuccess,(state,payload)=>{
    return {...state, items: payload.items};
  }),
  on(selectItem,(state,payload)=>{
    let updatedProducts = JSON.parse(JSON.stringify(state.products));
    updatedProducts[payload.itemType]['selected'] = payload.item;

    return {...state, products: updatedProducts};
  }),
  on(removeItemByType,(state,payload)=>{
    let updatedProducts = JSON.parse(JSON.stringify(state.products));
    updatedProducts[payload.itemType]['selected'] = null;
    const cartItems = [...state.cartItems];
    let index;
    if (cartItems.length) {
    cartItems.forEach((item,i)=>{
        if(item.type == payload.itemType){
          index = i;
        }
      })
      if(typeof index == 'number') {
        cartItems.splice(index,1);
      }
    }
    return {...state, products: updatedProducts, cartItems: cartItems};
  }),

  on(addItemsToCart,(state,payload)=>{
    let updatedProducts = JSON.parse(JSON.stringify(state.products));
    let cartItems = [];
    for(let items in updatedProducts) {
      if(updatedProducts[items]['selected']){
        cartItems.push(updatedProducts[items]['selected'])
      }
    }
    return {...state, cartItems: cartItems};
  }),

  on(removeCartItemByIndexAndType,(state,payload)=>{
    let cartItems = [...state.cartItems];
    let updatedProducts = JSON.parse(JSON.stringify(state.products));

    cartItems.splice(payload.index,1);
    if(payload.itemType){
      updatedProducts[payload.itemType]['selected'] = null;
    // let index;
    // if (cartItems.length) {
    //   cartItems.forEach((item,i)=>{
    //     if(item.type == payload.itemType){
    //       index = i;
    //     }
    //   })
    //   if(typeof index == 'number') {
    //     cartItems.splice(index,1);
    //   }
    // }
    }
    return {...state, cartItems: cartItems,  products: updatedProducts};
  }),

  )


