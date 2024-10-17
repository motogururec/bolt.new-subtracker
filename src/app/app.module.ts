import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptFormsModule } from '@nativescript/angular'
import { NativeScriptLocalNotificationsModule } from '@nativescript/local-notifications/angular'
import { NativeScriptUIChartModule } from 'nativescript-ui-chart/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SubscriptionsComponent } from './subscriptions/subscriptions.component'
import { SubscriptionDetailComponent } from './subscriptions/subscription-detail.component'
import { AddSubscriptionComponent } from './subscriptions/add-subscription.component'
import { AnalyticsComponent } from './analytics/analytics.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    NativeScriptLocalNotificationsModule,
    NativeScriptUIChartModule
  ],
  declarations: [
    AppComponent,
    SubscriptionsComponent,
    SubscriptionDetailComponent,
    AddSubscriptionComponent,
    AnalyticsComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}