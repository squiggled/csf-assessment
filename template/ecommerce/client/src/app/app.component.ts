import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private storeSvc = inject(CartStore)

  itemCount!: number

  ngOnInit(): void {
    this.storeSvc.cartCountObs$.subscribe(count=> {this.itemCount = count})
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}
