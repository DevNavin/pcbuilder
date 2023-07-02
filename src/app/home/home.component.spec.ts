import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { addItemsToCart, removeItemByType } from '../shared/products-store/products.actions';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [Store, Router],
      imports: [HttpClientTestingModule, StoreModule.forRoot({})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the item list page with the selected value', () => {
    spyOn(router, 'navigate');

    const itemType = '0';
    component.goToItems(itemType);

    expect(router.navigate).toHaveBeenCalledWith([('/item-list/'+itemType)]);
  });


  it('should dispatch addItemsToCart action', () => {
    spyOn(mockStore, 'dispatch');

    component.addToCart();

    expect(mockStore.dispatch).toHaveBeenCalledWith(addItemsToCart());
  });

  it('should dispatch removeItemFromCart action', () => {
    spyOn(mockStore, 'dispatch');

    component.removeItem("motherBoard");

    expect(mockStore.dispatch).toHaveBeenCalledWith(removeItemByType({itemType: "motherBoard"}));
  });

  it('should set item types on component initialisation', () => {

    spyOn(mockStore, 'select').and.returnValue(of(['motherboard', 'CPU', 'RAM']));
    component.ngOnInit();

    expect(component.itemTypes.length).toBe(3);

  });

  it('should set products on component initialisation', () => {
    const mockProducts = {
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
    };

    spyOn(mockStore, 'select').and.returnValue(of(mockProducts));
    component.ngOnInit();

    expect(component.products.motherBoard.title).toBe('Mother Board');

  });
  it('should unsubscribe from observables on component destruction', () => {
    const unsubscriptionSpy = spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(unsubscriptionSpy).toHaveBeenCalled();
  });

});
