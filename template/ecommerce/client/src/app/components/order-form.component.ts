import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem} from '../models';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)
  private storeSvc = inject(CartStore)

  @Input({ required: true })
  productId!: string
  @Input()
  name!:string
  @Input()
  price!:number

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  addToCart() {
    
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: '',
      price: 0
    }
    console.log("line item in order-form before assignment", lineItem);
    
    this.form = this.createForm()
    lineItem.name=this.name;
    lineItem.price = this.price;

    console.log("line item in order-form AFTER assignment", lineItem);
    this.storeSvc.addToCart(lineItem);
    
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }
  


}
