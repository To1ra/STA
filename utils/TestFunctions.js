//this file is to test potential function that we will use
//for example: monthly salary calculator, taxes calculator ect...
//this file can also be used to test which data structs we should use to keep out data, like shifts.

//the first building block of our app is the basic shift.
//the creation function should get: start and end date and time of shift, hourly rate of that shift, transport fees, and optional text.
//it should create a object or struct that contains all the above data, but also calculated information like: salary for that day, special rates, overtime, overall duration.

const getTodayWithTime = (timeStr, addDays = 0, now = Date.now()) => {
  if (!timeStr || !/^\d{1,2}:\d{2}$/.test(timeStr)) {
    throw new Error("Invalid time format. Expected 'HH:MM'");
  }
  console.log(addDays);
  const [hours, minutes] = timeStr.split(":").map(Number);
  now.setDate(now.getDate() + addDays);
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0
  );
};

const assignHourToDate = (timeStr, d) => {
  console.log(timeStr);
  console(timeStr.toString());
  const [hours, minutes] = timeStr.split(":").map(Number);
  d.setMinutes(minutes);
  d.setHours(hours);
};

function combineDateAndTime(d1, d2) {
  // Ensure both inputs are Date objects
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  // Extract date parts from d1
  const year = date1.getFullYear();
  const month = date1.getMonth(); // 0-based
  const day = date1.getDate();

  // Extract time parts from d2
  const hours = date2.getHours();
  const minutes = date2.getMinutes();
  const seconds = date2.getSeconds();
  const milliseconds = date2.getMilliseconds();

  // Create and return new combined Date
  return new Date(year, month, day, hours, minutes, seconds, milliseconds);
}

const isEmpty = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const keys = Object.keys(obj);
  return keys.length === 0;
};

function getHoursDifference(date1, date2) {
  try {
    const diffMilliseconds = Math.abs(date2.getTime() - date1.getTime());
    const diffHours = diffMilliseconds / (1000 * 60 * 60);
    const realDiff = roundTo(diffHours, 2);
    return realDiff;
  } catch (err) {
    console.log(err);
  }
}

//get objects from stringifyied array of objects
const getObjects = (str) => {
  let newStr = str;
  newStr = str.slice(0, -1);
  newStr = str.slice(1);
  const objects = newStr.map((item) => JSON.parse(item));
  return objects;
};

const roundTo = (num, decimals = 3) => Number(num.toFixed(decimals));

const roundTotalHoursInArray = (arr, decimals = 3) => {
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
