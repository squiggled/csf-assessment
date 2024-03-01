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
    
    this.cartInCheckout = this.storeSvc.getCart()
    
  

  }
  checkout(){
    // console.log("form" , this.form.value);
    
    if (this.form.valid){
      var cartSent!: Cart
      var orderSent!: Order;
      cartSent = {lineItems: this.cartInCheckout};
      console.log(this.form.value);
      orderSent = {
        name:this.form.value.name,
        address:this.form.value.address,
        priority: this.form.value.priority,
        comments:this.form.value.comments,
        cart:cartSent
      }
      // console.log("order sent ", orderSent);
      this.productSvc.checkout(orderSent);
    }
  }

  getTotal() {
   return this.total= this.cartInCheckout.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
