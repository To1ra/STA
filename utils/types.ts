export type wageRate = {
  id: string;
  check: number;
};

export type shift = {
  id: string;
  check: number;
};

export interface DynamicObject {
  Table?: string;
  edit?: string;
  dateStart?: Date;
  startTime?: Date;
  endTime?: Date;
  rate?: number;
  note?: number;
  color?: string;
  avatar?: string;
}
