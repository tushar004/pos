import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './services/data-service.service';
import { IProduct } from '../core/product';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit, OnDestroy {

  data: IProduct[];
  sub;
  productList = new Map();
  subTotal = 0;
  items = 0;
  vat = 0.000;
  discount = 0.000;
  total = 0.000;
  vatPercentage = 10;
  discountPercentage = 10;
  modal;
  saleNo = 0;
  date: Date;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.sub = this.dataService.getProducts().subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
    this.modal = document.getElementById('myModal');
  }

  process(): void {
    if (this.productList.size > 0) {
      this.modal.style.display = 'block';
      this.saleNo += 1;
      this.date = new Date(Date.now());
    }
  }

  closeModal(): void {
    this.modal.style.display = 'none';
    this.cancelSale();
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  multipleSix(num: number): boolean {
    let res = false;
    while (num > 0) {
      num -= 6;
      if (num === 0) {
        res = true;
      }
    }
    return res;
  }

  addProduct(product: IProduct): void {
    if (this.productList.has(product)) {
      const val = this.productList.get(product);
      this.productList.set(product, val + 1);
    } else {
      this.productList.set(product, 1);
    }
    this.items += 1;
    this.calculation();
  }

  deleteProduct(product: IProduct): void {
    if (this.productList.get(product) === 1) {
      this.productList.delete(product);
    } else {
      const val = this.productList.get(product);
      this.productList.set(product, val - 1);
    }
    this.items -= 1;
    this.calculation();
  }

  calculation(): void {
    this.subTotal = 0;
    this.total = 0;
    this.discount = 0;
    this.vat = 0;
    this.productList.forEach((val, key) => {
      this.subTotal += key.price * val;
    });
    this.discount = this.subTotal * (this.discountPercentage / 100);
    this.vat = this.subTotal * (this.vatPercentage / 100);
    this.total = this.subTotal + this.vat - this.discount;
  }

  cancelSale(): void {
    this.productList.clear();
    this.calculation();
    this.items = 0;
  }

}
