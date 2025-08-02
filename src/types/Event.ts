export interface MetadataRecurrenceType {
  every?: string;
  repeatEvery?: number;
  repeatOn?: string[];
  monthDate?: number;
  monthWeekNumber?: string;
  selectedWeekDay?: string;
  selectorType?: string;
}

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type EventMetadata = {
  [key in RecurrenceType]: MetadataRecurrenceType;
};

export interface EventFormValues {
  name: string;
  description: string;
  organiserId: string;
  eventRoomId?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isAllDayEvent: boolean;
  isRecurring: boolean;
  recurrenceType: string;
  status: 'authorized' | 'review';
  metadata: EventMetadata;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  organiserId: string;
  eventRoomId?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isAllDayEvent: boolean;
  isRecurring: boolean;
  recurrenceType?: string;
  status: "review" | "authorized";
  metadata: EventMetadata;
  companyId: string;
}

export interface EventWithOrganiserAndEventRoomName {
  id: string;
  name: string;
  description?: string;
  organiserId: string;
  eventRoomId?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isAllDayEvent: boolean;
  isRecurring: boolean;
  recurrenceType?: string;
  status: "review" | "authorized";
  metadata: EventMetadata;
  companyId: string;
  organiser: string;
  eventRoomName: string;
}
