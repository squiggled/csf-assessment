import { Component, OnInit, inject } from '@angular/core';
import { CartStore } from '../cart.store';
import { Cart, LineItem, Order } from '../models';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit{
  
  private storeSvc = inject(CartStore)
  private productSvc = inject(ProductService)
  constructor(private fb:FormBuilder){}

  // TODO Task 3
  itemCount!:number
  isCartEmpty!:boolean;
  cartObs$!: Observable<LineItem[]>;
  cartInCheckout!: LineItem[];
  form!:FormGroup;
  sub! :Subscription;

  total!:number

  ngOnInit(): void {
    // this.cartObs$=this.storeSvc.cartObs$;

    this.form=this.fb.group({
      name: this.fb.control<string>('', Validators.required),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
    
    this.sub = this.storeSvc.cartObs$.subscribe(items => {
      this.cartInCheckout = items
      console.log("this.cart ", this.cartInCheckout);
      //
// 0
// : 
// {prodId: '65e12d8f5ba8bdd8ab2c4449', quantity: 1, name: 'Cheese Slices - Made From Cow Milk 663 g Pouch + Cheese Spread - Classic 100 g', price: 675}
// 1
// : 
// {prodId: '65e12d8f5ba8bdd8ab2c4449', quantity: 1, name: 'Cheese Slices - Made From Cow Milk 663 g Pouch + Cheese Spread - Classic 100 g', price: 675}
// 2
// : 
// {prodId: '65e12d8f5ba8bdd8ab2c4449', quantity: 1, name: 'Cheese Slices - Made From Cow Milk 663 g Pouch + Cheese Spread - Classic 100 g', price: 675}
// 3
// : 
// {prodId: '65e12d8f5ba8bdd8ab2c4449', quantity: 1, name: 'Cheese Slices - Made From Cow Milk 663 g Pouch + Cheese Spread - Classic 100 g', price: 675}
// 4
// : 
// {prodId: '65e12d8f5ba8bdd8ab2c4449', quantity: 1, name: 'Cheese Slices - Made From Cow Milk 663 g Pouch + Cheese Spread - Classic 100 g', price: 675}
// length
// : 
// 5
      
      // JSON.stringify(this.cart, null, 2)
      // console.log("this.cart in confirm checkout " + JSON.stringify(this.cart, null, 2));
    });
    
    
    // console.log("this.cart in confirm checkout outside sub " + JSON.stringify(this.cartInCheckout, null, 2))
    // console.log(this.cartObs$);
    

  }
  checkout(){
    console.log("form" , this.form.value);
    
    if (this.form.valid){
      var cartSent!: Cart
      var orderSent!: Order;
      this.storeSvc.cartObs$.subscribe(cartItems => {
        cartSent = {lineItems: cartItems};
        console.log(this.form.value);
       
      })
      orderSent = {
        name:this.form.value.name,
        address:this.form.value.address,
        priority: this.form.value.priority,
        comments:this.form.value.comments,
        cart: cartSent
      }
      // console.log("order sent ", orderSent);
      this.productSvc.checkout(orderSent);
    }
    
   
  }

  getTotal() {
    this.total= this.cartInCheckout.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
