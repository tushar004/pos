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

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.sub = this.dataService.getProducts().subscribe(res => {
      this.data = res;
      console.log(this.data);

    });
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

}
