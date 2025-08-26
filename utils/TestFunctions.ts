//this file is to test potential function that we will use
//for example: monthly salary calculator, taxes calculator ect...
//this file can also be used to test which data structs we should use to keep out data, like shifts.

//the first building block of our app is the basic shift.
//the creation function should get: start and end date and time of shift, hourly rate of that shift, transport fees, and optional text.
//it should create a object or struct that contains all the above data, but also calculated information like: salary for that day, special rates, overtime, overall duration.

const getTodayWithTime = (
  timeStr: string,
  addDays = 0,
  now = new Date(Date.now())
) => {
  if (!timeStr || !/^\d{1,2}:\d{2}$/.test(timeStr)) {
    throw new Error("Invalid time format. Expected 'HH:MM'");
  }

  const [hours, minutes] = timeStr.split(":").map(Number);

  const date = new Date(now);

  date.setDate(date.getDate() + addDays);

  // Return a new Date with the specified time
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0
  );
};
const assignHourToDate = (timeStr: string, d: Date) => {
  console.log(timeStr);
  console.log(timeStr.toString());
  const [hours, minutes] = timeStr.split(":").map(Number);
  d.setMinutes(minutes);
  d.setHours(hours);
};

function combineDateAndTime(d1: Date, d2: Date) {
  // Ensure both inputs are Date objects
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  // Extract time parts from d2
  const hours = date2.getHours();
  const minutes = date2.getMinutes();
  const seconds = date2.getSeconds();
  const milliseconds = date2.getMilliseconds();

  // Create new combined Date in local time zone
  const combined = new Date(date1);
  combined.setHours(hours, minutes, seconds, milliseconds);

  return combined;
}

const isEmpty = (obj: Object) => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const keys = Object.keys(obj);
  return keys.length === 0;
};

function getHoursDifference(d1: Date, d2: Date) {
  try {
    const msDiff = Math.abs(d1.getTime() - d2.getTime()); // difference in ms
    const diffInHours = msDiff / (1000 * 60 * 60);
    return Math.round(diffInHours * 100) / 100; // round to 2 decimals
  } catch (err) {
    console.error(err);
    return 0;
  }
}

//get objects from stringifyied array of objects
const getObjects = (str: Array<string>) => {
  let newStr = str;
  newStr = str.slice(0, -1);
  newStr = str.slice(1);
  const objects = newStr.map((item: string) => JSON.parse(item));
  return objects;
};

const roundTo = (num: number, decimals = 3) => Number(num.toFixed(decimals));

const roundTotalHoursInArray = (arr: Array<any>, decimals = 3) => {
  arr.forEach((obj) => {
    obj["totalHours"] = roundTo(obj["totalHours"]);
  });
};

export {
  getTodayWithTime,
  getHoursDifference,
  isEmpty,
  getObjects,
  assignHourToDate,
  roundTotalHoursInArray,
  roundTo,
  combineDateAndTime,
};
