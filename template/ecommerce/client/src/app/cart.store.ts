// TODO Task 2
// Use the following class to implement your store

import { Injectable } from "@angular/core";
import { LineItem } from "./models";
import { Observable, Subject } from "rxjs";

@Injectable()
export class CartStore {

    cart: LineItem[] = []
    private cartSubject = new Subject<LineItem[]>();
    cartObs$ = this.cartSubject.asObservable();

    private cartCountSub = new Subject<number>();
    cartCountObs$ =this.cartCountSub.asObservable();

    isCartEmpty:boolean=true;


    addToCart(lineItem: LineItem) {
        this.cart=[...this.cart, lineItem];
        console.log("cart in cart store" + JSON.stringify(this.cart));
    
        this.cartSubject.next(this.cart);
        // console.log("cart length " + this.cart.length);
        if (this.cart.length>0) this.isCartEmpty=false;
        
        this.cartCountSub.next(this.cart.length); //pass item count to app.comp
    }
    getCart(){
        return this.cart;
    }

}
