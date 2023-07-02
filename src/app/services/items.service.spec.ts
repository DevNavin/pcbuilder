import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router]
    });
    service = TestBed.inject(ItemsService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch items', () => {
    const mockItems = [
      {
        "itemName": "REO Desktop Intel Core i5 650 3.2",
        "brand": "REO",
        "model": "NR100",
        "price": "17000",
        "image": "../../assets/cpu-1.jpg",
        "type": "CPU",
        "about": "Slim, Elegant, Best in class high speed Desktop for Home, Office use,Intel Core i5 650 3.2Ghz, Reo Intel H55 Motherboard, Reo 4 GB DDR3 RAM, Superfast 120GB SSD Hard Disk with additional 500GB SATA (7200 RPM) Hard Disk (Total 2 Hard Disk inside the System), Intel HD Graphics, VGA, HDMI Supports, 500 Watt SMPS, Wi-Fi Ready; Integrated extra cooling fan for better heat management, 6 USB ports, front USB, front Audio, Hardware Platform: Pc; Form Factor: Tower"
      },
      {
        "itemName": "Lenovo ThinkCentre Desktop Mini PC (Intel Core i5 6th Gen|8 GB",
        "brand": "Lenovo",
        "model": "Mini PC",
        "price": "11500",
        "image": "../../assets/cpu-2.jpg",
        "type": "CPU",
        "about": "Lenovo Thinkcentre High Performance Mini PC Secure, Scalable and Robust Architecture with limitless expansion possibilities. This desktop computer has features like Intel i5 6th gen processor with 2.2 GHz upto 2.8 GHz with Intel Turbo Boost Technology, 8 GB DDR4 RAM, 512 GB SSD making it the perfect mini desktop pc to carry out all tasks in one place."
      },
      {
        "itemName": "Dell (Renewed) OPTIPLEX 3040 Tiny Desktop (Intel Core i3 6th gen 3.2ghz, 8 GB RAM",
        "brand": "Dell",
        "model": "OPTIPLEX 3040",
        "price": "11000",
        "image": "../../assets/cpu-3.jpg",
        "type": "CPU",
        "about": "DELL Optiplex 3040 Tiny Business Class Desktop Secure, Scalable and Robust Architecture it is JUST A SIZE OF SMALL NOTEBOOK. Intel Core i3 (6th Gen) 3.2 GHz, 8 GB PC3L RAM , Audio In/Out Jacks., 480GB SSD for SUPER Fast Processing."
      }
    ];

    const payload = 'cpu-list.json';

    service.getItems(payload).subscribe((res: any) => {
      expect(res).toEqual(mockItems);
    });

    const req = httpMock.expectOne(`../../assets/${payload}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });


});
