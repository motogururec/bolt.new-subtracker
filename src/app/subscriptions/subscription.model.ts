export interface Subscription {
  id: string;
  name: string;
  cost: number;
  renewalDate: Date;
  category: string;
  status: 'active' | 'paused' | 'canceled';
  lastUsed?: Date;
}