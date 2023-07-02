import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ItemListComponent } from './item-list.component';
import { ItemsService } from '../services/items.service';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getItems, selectItem } from '../shared/products-store/products.actions';
import { StoreModule } from '@ngrx/store';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let mockStore: Store;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('0')
              }
            }
          }
        },
        Store
      ],
      imports: [HttpClientModule, StoreModule.forRoot({})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch items and set ItemsList correctly on initialization', () => {
    const mockItems = [
      {
          "itemName":"Ant Value G41MAD3",
          "brand":"Ant Value",
          "chipset":"Intel G41 Express",
          "model":"sTRX4",
          "price":"5000",
          "image":"../../assets/mb-1.jpg",
          "type":"motherBoard",
          "about":"ASUS EX-A320M Gaming Motherboard is expertly engineered to compliment the AMD platform perfectly with game-ready features and proven durability through use of High-quality components. Supports 3rd/2nd/1st Gen AMD Ryzen 2nd and 1st Gen AMD Ryzen (with Radeon Vega Graphics/Athlon with Radeon Vega Graphics/7th Generation A-series/Athlon X4 Processors) with AMD A320 chipset."
      },
      {
          "itemName":"MSI A320M-A PRO AMD PCIe 3.0",
          "brand":"MSI",
          "chipset":"Intel G43 Express",
          "model":"A320M",
          "price":"4500",
          "image":"../../assets/mb-2.jpg",
          "type":"motherBoard",
          "about":"Supports 1st, 2nd and 3rd Gen AMD Ryzen for Socket AM4. Audio Boost: Reward your ears with studio grade sound quality. Supports DDR4 Memory, up to 3200 (OC) MHz."
      },
      {
          "itemName":"Ant Value H61MAD3-N mATX Gaming Motherboard",
          "brand":"Ant Value",
          "chipset":"Intel H61 Express",
          "model":"sTRX4",
          "price":"6000",
          "image":"../../assets/mb-3.jpg",
          "type":"motherBoard",
          "about":"Supports 2nd/ 3rd Gen Intel Core / Pentium/ Celeron processors for LGA 1155 socket. Chipset: Intel H61 Chipset mATX. Supports DDR3 RAM, Clockspeed up to 1333 MHz, Slots: 21xM.2 slot (Key M), 4 x SATA III ports and support up to PCIe 3.0x4 and SATA 6Gb/s 1 x VGA and 1 x HDMI port"
      }
  ];

  spyOn(mockStore, 'dispatch')
    spyOn(mockStore, 'select').and.returnValue(of(mockItems));

    component.ngOnInit();

    expect(mockStore.dispatch).toHaveBeenCalledWith(getItems({ itemType: 'motherboard-list.json'}));
    expect(component.ItemsList).toEqual(mockItems);
  });

  it('should dispatch selectItem action', () => {
   spyOn(mockStore, 'dispatch');

    const item = { id: 1, itemName: 'Item 1' };
    component.itemTypes = ["motherBoard","CPU","RAM"];
    component.listType = '0';
    component.addItem(item);

    expect(mockStore.dispatch).toHaveBeenCalledWith(selectItem({item: item, itemType: 'motherBoard'}));
  });
});
