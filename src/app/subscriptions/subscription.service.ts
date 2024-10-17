import { Injectable } from '@angular/core';
import { Subscription } from './subscription.model';
import { LocalNotifications } from '@nativescript/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptions: Subscription[] = [];

  constructor() {
    this.loadSubscriptions();
  }

  private loadSubscriptions() {
    const storedSubscriptions = localStorage.getItem('subscriptions');
    if (storedSubscriptions) {
      this.subscriptions = JSON.parse(storedSubscriptions);
    }
  }

  private saveSubscriptions() {
    localStorage.setItem('subscriptions', JSON.stringify(this.subscriptions));
  }

  getSubscriptions(): Subscription[] {
    return this.subscriptions;
  }

  getSubscription(id: string): Subscription | undefined {
    return this.subscriptions.find(sub => sub.id === id);
  }

  addSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
    this.saveSubscriptions();
    this.scheduleRenewalReminder(subscription);
  }

  updateSubscription(updatedSubscription: Subscription) {
    const index = this.subscriptions.findIndex(sub => sub.id === updatedSubscription.id);
    if (index !== -1) {
      this.subscriptions[index] = updatedSubscription;
      this.saveSubscriptions();
      this.scheduleRenewalReminder(updatedSubscription);
    }
  }

  deleteSubscription(id: string) {
    this.subscriptions = this.subscriptions.filter(sub => sub.id !== id);
    this.saveSubscriptions();
    LocalNotifications.cancel(parseInt(id));
  }

  private scheduleRenewalReminder(subscription: Subscription) {
    const notificationId = parseInt(subscription.id);
    LocalNotifications.schedule([{
      id: notificationId,
      title: 'Subscription Renewal Reminder',
      body: `Your ${subscription.name} subscription is due for renewal soon.`,
      at: new Date(subscription.renewalDate.getTime() - 24 * 60 * 60 * 1000) // 1 day before renewal
    }]);
  }

  getTotalMonthlyCost(): number {
    return this.subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => total + sub.cost, 0);
  }

  getSubscriptionsByCategory(): { [key: string]: number } {
    return this.subscriptions.reduce((acc, sub) => {
      if (sub.status === 'active') {
        acc[sub.category] = (acc[sub.category] || 0) + sub.cost;
      }
      return acc;
    }, {});
  }

  suggestPotentialSavings(): Subscription[] {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return this.subscriptions.filter(sub => 
      sub.status === 'active' && (!sub.lastUsed || sub.lastUsed < oneMonthAgo)
    );
  }
}