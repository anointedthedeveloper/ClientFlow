export type Role = 'ADMIN' | 'SALES' | 'SUPPORT';
export type DealStage = 'LEAD' | 'CONTACTED' | 'PROPOSAL' | 'CLOSED';
export type ActivityType = 'NOTE' | 'CALL' | 'EMAIL';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  organizationId: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  organizationId: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  customerId: string;
  customer?: Customer;
  assignedToId?: string;
  assignedTo?: Pick<User, 'id' | 'name' | 'email'>;
  organizationId: string;
  activities?: Activity[];
  createdAt: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  content: string;
  dealId?: string;
  createdBy: string;
  user?: Pick<User, 'id' | 'name'>;
  createdAt: string;
}

export interface Dashboard {
  totalCustomers: number;
  totalDeals: number;
  totalRevenue: number;
  byStage: Record<DealStage, number>;
}
