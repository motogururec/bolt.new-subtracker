import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Subscription } from './subscription.model';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'ns-subscription-detail',
  templateUrl: './subscription-detail.component.html',
})
export class SubscriptionDetailComponent implements OnInit {
  subscription: Subscription | undefined;

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.subscription = this.subscriptionService.getSubscription(id);
  }

  onPauseSubscription(): void {
    if (this.subscription) {
      this.subscription.status = 'paused';
      this.subscriptionService.updateSubscription(this.subscription);
    }
  }

  onResumeSubscription(): void {
    if (this.subscription) {
      this.subscription.status = 'active';
      this.subscriptionService.updateSubscription(this.subscription);
    }
  }

  onCancelSubscription(): void {
    if (this.subscription) {
      this.subscription.status = 'canceled';
      this.subscriptionService.updateSubscription(this.subscription);
    }
  }

  onDeleteSubscription(): void {
    if (this.subscription) {
      this.subscriptionService.deleteSubscription(this.subscription.id);
      this.routerExtensions.back();
    }
  }
}