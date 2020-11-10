import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/product';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http: HttpClient) { }

  getProducts(): Observable<Array<IProduct>>{
    return this.http.get<IProduct[]>('assets/mock/pos.products.json');
  }
}
