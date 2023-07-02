import { productsStateReducer, initialState, IProductsState } from './products.reducer';
import { addItemsToCart, getItemsSuccess, removeCartItemByIndexAndType, removeItemByType, selectItem } from './products.actions';

describe('productsStateReducer', () => {
  const mockItem = {
    "itemName":"REO Desktop Intel Core i5 650 3.2",
    "brand":"REO",
    "model":"NR100",
    "price":"1000",
    "image":"../../assets/cpu-1.jpg",
    "type":"CPU",
    "about":"Slim, Elegant, Best in class high speed Desktop for Home, Office use,Intel Core i5 650 3.2Ghz, Reo Intel H55 Motherboard, Reo 4 GB DDR3 RAM, Superfast 120GB SSD Hard Disk with additional 500GB SATA (7200 RPM) Hard Disk (Total 2 Hard Disk inside the System), Intel HD Graphics, VGA, HDMI Supports, 500 Watt SMPS, Wi-Fi Ready; Integrated extra cooling fan for better heat management, 6 USB ports, front USB, front Audio, Hardware Platform: Pc; Form Factor: Tower"
};
  it('should return the initial state', () => {
    const action = {} as any;
    const state = productsStateReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle getItemsSuccess', () => {
    const mockItems = [
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
      },
      {
          "itemName":"Lenovo IdeaCentre 3",
          "brand":"Lenovo",
          "model":"Mini PC",
          "price":"1100",
          "image":"../../assets/cpu-4.jpg",
          "type":"CPU",
          "about":"Lenovo Thinkcentre High Performance Mini PC Secure, Scalable and Robust Architecture with limitless expansion possibilities. This desktop computer has features like Intel i5 6th gen processor with 2.2 GHz upto 2.8 GHz with Intel Turbo Boost Technology, 8 GB DDR4 RAM, 512 GB SSD making it the perfect mini desktop pc to carry out all tasks in one place."
      },
      {
          "itemName":"Lenovo IdeaCentre Gaming 5 Desktop (AMD Ryzen 5 5600G/8GB/512GB)",
          "brand":"Lenovo",
          "model":"Mini PC",
          "price":"1600",
          "image":"../../assets/cpu-5.jpg",
          "type":"CPU",
          "about":"Lenovo Thinkcentre High Performance Mini PC Secure, Scalable and Robust Architecture with limitless expansion possibilities. This desktop computer has features like Intel i5 6th gen processor with 2.2 GHz upto 2.8 GHz with Intel Turbo Boost Technology, 8 GB DDR4 RAM, 512 GB SSD making it the perfect mini desktop pc to carry out all tasks in one place."
      }
  ];
    const payload = {
      items: mockItems
    };
    const action = getItemsSuccess(payload);
    const state = productsStateReducer(initialState, action);
    expect(state.items).toEqual(payload.items);
  });

  it('should handle selectItem', () => {

    const payload = {
      itemType: 'CPU',
      item: mockItem
    };
    const action = selectItem(payload);
    const state = productsStateReducer(initialState, action);
    expect(state.products.CPU.selected).toEqual(mockItem);

  });

  it('should handle removeItemByType', () => {
    const currentState = {
      products: {
        motherBoard: {
          title: 'Mother Board',
          selected: null,
          route: '0',
          image: "../../assets/motherboard.jpg",
        },
        CPU : {
          title: 'CPU',
          selected: mockItem,
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
      cartItems: [mockItem],
      items: [],
      itemTypes: ["motherBoard","CPU","RAM"]
    };
    const payload = {
      itemType: 'CPU'
    };
    const action = removeItemByType(payload);
    const state = productsStateReducer(currentState, action);
    expect(state.products.CPU.selected).toBe(null);
    expect(state.cartItems).toEqual([]);

  });

  it('should handle addItemsToCart', () => {
    const currentState = {
      products: {
        motherBoard: {
          title: 'Mother Board',
          selected: null,
          route: '0',
          image: "../../assets/motherboard.jpg",
        },
        CPU : {
          title: 'CPU',
          selected: mockItem,
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
    };
    const action = addItemsToCart();
    const state = productsStateReducer(currentState, action);
    expect(state.cartItems[0]).toEqual(mockItem);

  });

  it('should handle removeCartItemByIndexAndType', () => {
    const currentState = {
      products: {
        motherBoard: {
          title: 'Mother Board',
          selected: null,
          route: '0',
          image: "../../assets/motherboard.jpg",
        },
        CPU : {
          title: 'CPU',
          selected: mockItem,
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
      cartItems: [mockItem],
      items: [],
      itemTypes: ["motherBoard","CPU","RAM"]
    };
    const payload = {
      index: 0,
      itemType: 'CPU'
    };
    const action = removeCartItemByIndexAndType(payload);
    const state = productsStateReducer(currentState, action);
    expect(state.cartItems).toEqual([]);
    expect(state.products.CPU.selected).toBe(null);
  });
});
