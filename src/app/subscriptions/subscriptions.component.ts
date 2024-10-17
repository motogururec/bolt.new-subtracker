import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from './subscription.model';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'ns-subscriptions',
  templateUrl: './subscriptions.component.html',
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  totalMonthlyCost: number = 0;

  constructor(
    private subscriptionService: SubscriptionService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptions = this.subscriptionService.getSubscriptions();
    this.totalMonthlyCost = this.subscriptionService.getTotalMonthlyCost();
  }

  onItemTap(item: Subscription): void {
    this.routerExtensions.navigate(['/subscription', item.id]);
  }

  onAddSubscription(): void {
    this.routerExtensions.navigate(['/add-subscription']);
  }
}