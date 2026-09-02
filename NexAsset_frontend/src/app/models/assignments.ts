export interface Assignments {
  id: number;
  assetId: number;
  employeeId: number;
  assignedDate: Date;
  returnedDate?: Date;
  status: string;
}