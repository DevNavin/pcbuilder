import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getItems, selectItem } from '../shared/products-store/products.actions';
import { Store } from '@ngrx/store';
import { itemTypes, items } from '../shared/products-store/products.selectors';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  ItemsList:any[] = [];
  payload = ['motherboard-list.json','cpu-list.json','ram-list.json'];
  itemTypes: any;
  listType:any;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
    ){}

  ngOnInit(): void {
    this.store.select(items).subscribe((data) => {
      this.ItemsList = data;
    })
    this.store.select(itemTypes).subscribe((data) => {
      this.itemTypes = data;
    });
    let listType = this.route.snapshot.paramMap.get('type') as string;
    this.listType = this.route.snapshot.paramMap.get('type') as string;
    this.store.dispatch(getItems({itemType: this.payload[+listType]}))
  }

  addItem(e:any){
    this.store.dispatch(selectItem({item: e,itemType: this.itemTypes[this.listType]}));
    this.router.navigate(['/']);
  }
}
