import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from './subscription.model';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'ns-add-subscription',
  templateUrl: './add-subscription.component.html',
})
export class AddSubscriptionComponent {
  newSubscription: Subscription = {
    id: '',
    name: '',
    cost: 0,
    renewalDate: new Date(),
    category: '',
    status: 'active'
  };

  constructor(
    private subscriptionService: SubscriptionService,
    private routerExtensions: RouterExtensions
  ) {}

  onAddSubscription(): void {
    this.newSubscription.id = Date.now().toString();
    this.subscriptionService.addSubscription(this.newSubscription);
    this.routerExtensions.back();
  }
}