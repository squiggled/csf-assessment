import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, firstValueFrom} from "rxjs";
import {Order, Product} from "./models";
import { Router } from "@angular/router";

@Injectable()
export class ProductService {

  private http = inject(HttpClient)
  private router = inject(Router)


  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/api/categories')
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/category/${category}`)
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // TODO Task 3
  checkout(order: Order) {
    console.log("order" , order);
    firstValueFrom(this.http.post<any>(`api/order`, order))
    .then(result=> {
      alert("orderId: " + result.orderId);
      this.router.navigate(['']);
    })
    .catch(error => alert(error.message));
  }
}
