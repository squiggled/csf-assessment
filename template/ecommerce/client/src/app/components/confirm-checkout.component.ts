import { Component, OnInit, inject } from '@angular/core';
import { CartStore } from '../cart.store';
import { LineItem } from '../models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit{
  
  private storeSvc = inject(CartStore)
  constructor(private fb:FormBuilder){}

  // TODO Task 3
  itemCount!:number
  isCartEmpty!:boolean;
  cartObs$!: Observable<LineItem[]>;

  form!:FormGroup;

  ngOnInit(): void {
    this.form=this.fb.group({
      name: this.fb.control<string>('', Validators.required),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
    
    this.cartObs$=this.storeSvc.cartObs$;

  }
  checkout(){
    console.log("got here " + this.form.valid);
    
  }

}
