import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SubscriptionsComponent } from './subscriptions/subscriptions.component'
import { SubscriptionDetailComponent } from './subscriptions/subscription-detail.component'
import { AddSubscriptionComponent } from './subscriptions/add-subscription.component'
import { AnalyticsComponent } from './analytics/analytics.component'

const routes: Routes = [
  { path: '', redirectTo: '/subscriptions', pathMatch: 'full' },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'subscription/:id', component: SubscriptionDetailComponent },
  { path: 'add-subscription', component: AddSubscriptionComponent },
  { path: 'analytics', component: AnalyticsComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}