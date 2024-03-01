// TODO Task 2
// Use the following class to implement your store

import { Injectable } from "@angular/core";
import { LineItem } from "./models";
import { Observable, Subject } from "rxjs";

@Injectable()
export class CartStore {

    cart: LineItem[] = []
    private cartSubject = new Subject<LineItem[]>();
    cartObs$!: Observable<LineItem[]>;

    private cartCountSub = new Subject<number>();
    cartCountObs$!: Observable<number>;


    addToCart(lineItem: LineItem) {
        this.cart=[...this.cart, lineItem];
        this.cartSubject.next(this.cart);
        console.log("cart length " + this.cart.length);
        
        this.cartCountSub.next(this.cart.length); //pass item count to app.comp
    }


}
