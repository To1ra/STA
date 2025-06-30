//this file is to test potential function that we will use
//for example: monthly salary calculator, taxes calculator ect...
//this file can also be used to test which data structs we should use to keep out data, like shifts.

//the first building block of our app is the basic shift.
//the creation function should get: start and end date and time of shift, hourly rate of that shift, transport fees, and optional text.
//it should create a object or struct that contains all the above data, but also calculated information like: salary for that day, special rates, overtime, overall duration.

const getTodayWithTime = (timeStr) => {
  if (!timeStr || !/^\d{1,2}:\d{2}$/.test(timeStr)) {
    throw new Error("Invalid time format. Expected 'HH:MM'");
  }

  const [hours, minutes] = timeStr.split(":").map(Number);
  const now = new Date();

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

const isEmpty = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const keys = Object.keys(obj);
  return keys.length === 0;
};

function getHoursDifference(date1, date2) {
  const diffMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  const diffHours = diffMilliseconds / (1000 * 60 * 60);
  return diffHours;
}

//get objects from stringifyied array of objects
const getObjects = (str) => {
  let newStr = str;
  newStr = str.slice(0, -1);
  newStr = str.slice(1);
  const objects = newStr.map((item) => JSON.parse(item));
  return objects;
};

export { getTodayWithTime, getHoursDifference, isEmpty, getObjects };
