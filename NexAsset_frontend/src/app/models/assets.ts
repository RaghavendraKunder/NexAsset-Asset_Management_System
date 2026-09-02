export interface Assets {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  status: string;
  assignedTo?: number;
  condition: string;
  value: number;
}