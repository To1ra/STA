export type wageRate = {
  id: string;
  check: number;
};

export type shift = {
  id: string;
  check: number;
};

export interface WageRateData {
  id: string | number;
  name: string;
  startDate: string;
  startHour: string;
  endDate: string;
  endHour: string;
  rate: string;
}

export interface ShiftData {
  id: string | number;
  name: string;
  startDate: string;
  startHour: string;
  endDate: string;
  endHour: string;
  rate: string;
}

export interface ActualShiftData {
  id: string | number;
  yearDate: number;
  monthDate: number;
  dayDate: number;
  startTime: string;
  endTime: string;
  totalHours: string | number;
}

export interface DynamicObject {
  id?: string | number;
  Table?: string;
  edit?: string;
  dateStart?: Date;
  startTime?: Date;
  endTime?: Date;
  rate?: number;
  note?: string | number;
  color?: string;
  avatar?: string;
}
