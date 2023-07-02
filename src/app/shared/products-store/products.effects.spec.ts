import { ProductEffects } from './products.effects';
import { getItems, getItemsSuccess, getItemsError } from './products.actions';
import { ItemsService } from 'src/app/services/items.service';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, ReplaySubject, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';

describe('ProductEffects', () => {
  let effects: ProductEffects;
  let actions$: ReplaySubject<any>;
  let itemsService: jasmine.SpyObj<ItemsService>;

  beforeEach(() => {
    const itemsServiceMock = jasmine.createSpyObj('ItemsService', ['getItems']);
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        { provide: ItemsService, useValue: itemsServiceMock }
      ]
    });
    effects = TestBed.inject(ProductEffects);
    itemsService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;
  });

  it('should return getItemsSuccess action with items on success', () => {
    const itemType = 'CPU';
    const items = [
      {
          "itemName":"REO Desktop Intel Core i5 650 3.2",
          "brand":"REO",
          "model":"NR100",
          "price":"1000",
          "image":"../../assets/cpu-1.jpg",
          "type":"CPU",
          "about":"Slim, Elegant, Best in class high speed Desktop for Home, Office use,Intel Core i5 650 3.2Ghz, Reo Intel H55 Motherboard, Reo 4 GB DDR3 RAM, Superfast 120GB SSD Hard Disk with additional 500GB SATA (7200 RPM) Hard Disk (Total 2 Hard Disk inside the System), Intel HD Graphics, VGA, HDMI Supports, 500 Watt SMPS, Wi-Fi Ready; Integrated extra cooling fan for better heat management, 6 USB ports, front USB, front Audio, Hardware Platform: Pc; Form Factor: Tower"
      },
      {
          "itemName":"Lenovo ThinkCentre Desktop Mini PC (Intel Core i5 6th Gen|8 GB",
          "brand":"Lenovo",
          "model":"Mini PC",
          "price":"1500",
          "image":"../../assets/cpu-2.jpg",
          "type":"CPU",
          "about":"Lenovo Thinkcentre High Performance Mini PC Secure, Scalable and Robust Architecture with limitless expansion possibilities. This desktop computer has features like Intel i5 6th gen processor with 2.2 GHz upto 2.8 GHz with Intel Turbo Boost Technology, 8 GB DDR4 RAM, 512 GB SSD making it the perfect mini desktop pc to carry out all tasks in one place."
      },
      {
          "itemName":"Dell (Renewed) OPTIPLEX 3040 Tiny Desktop (Intel Core i3 6th gen 3.2ghz, 8 GB RAM",
          "brand":"Dell",
          "model":"OPTIPLEX 3040",
          "price":"1000",
          "image":"../../assets/cpu-3.jpg",
          "type":"CPU",
          "about":"DELL Optiplex 3040 Tiny Business Class Desktop Secure, Scalable and Robust Architecture it is JUST A SIZE OF SMALL NOTEBOOK. Intel Core i3 (6th Gen) 3.2 GHz, 8 GB PC3L RAM , Audio In/Out Jacks., 480GB SSD for SUPER Fast Processing."
      }];
      actions$ = new ReplaySubject(1);
      actions$.next(getItems({ itemType }));
    const expectedAction = getItemsSuccess({ items });

    itemsService.getItems.and.returnValue(of(items));

    effects.getItems$.subscribe((resultAction) => {
      expect(resultAction).toEqual(expectedAction);
    });
  });

  it('should return getItemsError action on error', () => {
    const itemType = 'CPU';
    const error = new Error('Failed to fetch items');
    actions$ = new ReplaySubject(1);
      actions$.next(getItems({ itemType }));
    const expectedAction = getItemsError();

    itemsService.getItems.and.returnValue(throwError(error));

    effects.getItems$.subscribe((resultAction) => {
      expect(resultAction).toEqual(expectedAction);
    });

  });
});


