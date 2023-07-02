import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonHeaderComponent } from './common-header.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { Subject, of } from 'rxjs';

describe('CommonHeaderComponent', () => {
  let component: CommonHeaderComponent;
  let fixture: ComponentFixture<CommonHeaderComponent>;
  let mockStore: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonHeaderComponent],
      providers: [Store, Router],
      imports: [HttpClientModule, StoreModule.forRoot({})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonHeaderComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the cart page', () => {
    spyOn(router, 'navigate');

    component.goToCart();

    expect(router.navigate).toHaveBeenCalledWith(['/cart']);
  });

  it('should fetch cart items on component initialization', () => {
    const cartItems = [{
      "itemName":"REO Desktop Intel Core i5 650 3.2",
      "brand":"REO",
      "model":"NR100",
      "price":"1000",
      "image":"../../assets/cpu-1.jpg",
      "type":"CPU",
      "about":"Slim, Elegant, Best in class high speed Desktop for Home, Office use,Intel Core i5 650 3.2Ghz, Reo Intel H55 Motherboard, Reo 4 GB DDR3 RAM, Superfast 120GB SSD Hard Disk with additional 500GB SATA (7200 RPM) Hard Disk (Total 2 Hard Disk inside the System), Intel HD Graphics, VGA, HDMI Supports, 500 Watt SMPS, Wi-Fi Ready; Integrated extra cooling fan for better heat management, 6 USB ports, front USB, front Audio, Hardware Platform: Pc; Form Factor: Tower"
  }];

    spyOn(mockStore, 'select').and.returnValue(of(cartItems));

    fixture.detectChanges();
    expect(component.cartItems.length).toBe(1);
  });
});
