export interface History {
  id: number;
  action: string;
  assetId?: number;
  employeeId?: number;
  description: string;
  createdAt: Date;
}