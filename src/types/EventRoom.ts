export interface EventRoomFormFormValues {
  name: string;
  capacity: string;
  location: string;
  isUnderMaintenance: boolean;
  startTime: string;
  endTime: string;
}

export interface EventRoom {
  id: string;
  name: string;
  capacity: string;
  location: string;
  isUnderMaintenance: boolean;
  startTime: string;
  endTime: string;
  companyId: string;
}
