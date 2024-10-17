import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscriptions/subscription.service';
import { Subscription } from '../subscriptions/subscription.model';

@Component({
  selector: 'ns-analytics',
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
  categoryData: { category: string; cost: number }[] = [];
  potentialSavings: Subscription[] = [];

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.loadCategoryData();
    this.loadPotentialSavings();
  }

  loadCategoryData(): void {
    const categoryTotals = this.subscriptionService.getSubscriptionsByCategory();
    this.categoryData = Object.entries(categoryTotals).map(([category, cost]) => ({ category, cost }));
  }

  loadPotentialSavings(): void {
    this.potentialSavings = this.subscriptionService.suggestPotentialSavings();
  }
}