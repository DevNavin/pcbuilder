import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { removeCartItemByIndexAndType } from '../shared/products-store/products.actions';
import { of } from 'rxjs';
import { productsStateReducer } from '../shared/products-store/products.reducer';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockStore: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [Store],
      imports: [HttpClientModule, StoreModule.forRoot({products: productsStateReducer})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total correctly', () => {
    component.cartItems = [
      { price: '10' },
      { price: '20' },
      { price: '30' }
    ];
    spyOn(mockStore, 'select').and.returnValue(of([
      { price: '10' },
      { price: '20' },
      { price: '30' }
    ]));

    const total = component.getTotal();
    expect(total).toEqual(60);
  });

  it('should return 0 if the cart is empty', () => {
    component.cartItems = [];
    spyOn(mockStore, 'select').and.returnValue(of([]));


    const total = component.getTotal();
    expect(total).toEqual(0);
  });

  it('should call removeItemFromCart method with the correct parameters', () => {
    spyOn(mockStore, 'dispatch');

    const index = 0;
    const type = 'someType';
    component.removeItem(index, type);
    expect(mockStore.dispatch).toHaveBeenCalled();

  });
});
