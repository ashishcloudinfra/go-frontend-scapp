export type EquipmentStatus = 'available' | 'maintenance' | 'decommissioned';

export type EquipmentsByStatus = Record<EquipmentStatus, InventoryItem[]>;

export interface InventoryItem {
  id: string;
  name: string;
  img: string;
  type: string;
  instructions: string;
  count: number;
};

export interface Equipment {
  id: string;
  name: string;
  img: string;
  type: string;
  instructions: string;
};

export interface UpdateEquipmentFormValues {
  equipmentId: string;
  prevStatus: string;
  newStatus: string;
  count: string;
}

export interface UpdateEquipmentReqBody {
  equipmentId: string;
  prevStatus: string;
  newStatus: string;
  count: number;
}

export interface EquipmentReqBody {
  name: string;
  img: string;
  type: string;
  instructions: string;
};