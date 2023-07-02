import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { CartComponent } from './cart/cart.component';
import { ItemListComponent } from './item-list/item-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { productsStateReducer } from './shared/products-store/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './shared/products-store/products.effects';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommonHeaderComponent,
    CartComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot({
      products: productsStateReducer
    }),
    EffectsModule.forRoot(ProductEffects)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
