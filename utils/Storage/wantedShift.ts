// utils/ShiftStore.ts
import { ShiftData } from "../types";

let wanted: ShiftData | null;

export const setShiftData = (data: ShiftData | null) => {
  wanted = data;
};

export const getShiftData = () => wanted;
