import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './services/data-service.service';
import { IProduct } from '../core/product';


/**
 * The component that holds all the logic and UI for the POS system.
 */
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

  /**
   * Constructor function for the class MainScreenComponent.
   *
   * @param dataService data service instance for dependency injection to get the data from json file or the API.
   */
  constructor(private readonly dataService: DataService) { }

  /**
   * This method ss used to do something after the component get initialized, here we're using it to get our data
   * for populating it in the HTML and getting a HTML element reference to use it as a modal or popup.
   */
  ngOnInit(): void {
    this.sub = this.dataService.getProducts().subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
    this.modal = document.getElementById('myModal');
  }

  /**
   * This method is invoked when we click on PROCESS SALE button, it gets the currrent time, shows the popup reciept
   *  and modifies the sale number.
   */
  process(): void {
    if (this.productList.size > 0) {
      this.modal.style.display = 'block';
      this.saleNo += 1;
      this.date = new Date(Date.now());
    }
  }

  /**
   * This method is used to close the popup reciept and reset the sale data.
   */
  closeModal(): void {
    this.modal.style.display = 'none';
    this.cancelSale();
  }


  /**
   * This is used for garbage collection, set interval,timeoout and subscriptions are to be stopped here.
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  /**
   * This checks if a number is a multiple of 6 or not.
   *
   * @param num number that is to be checked.
   */
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

  /**
   * Method to add a product in the Map or the shopping list.
   *
   * @param product Product to be added
   */
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

  /**
   * Method to delete a product from the Map or the shopping list.
   *
   * @param  product Product to be added
   */
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

  /**
   * Method to calculate total, subtotal, vat and discount.
   */
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

  /**
   * Method to reset the sale data or the productList Map.
   */
  cancelSale(): void {
    this.productList.clear();
    this.calculation();
    this.items = 0;
  }

}
