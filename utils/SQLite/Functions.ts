import * as SecureStore from "expo-secure-store";
import {
  getHoursDifference,
  getTodayWithTime,
  roundTotalHoursInArray,
  combineDateAndTime,
} from "../TestFunctions";
import { SQLiteAnyDatabase } from "expo-sqlite/build/NativeSession";
import { DynamicObject } from "../types";

const submitData = (
  db: SQLiteAnyDatabase,
  dataRef: React.RefObject<DynamicObject>
) => {
  try {
    if (!dataRef.current) return;

    const data = dataRef.current;
    if (data["Table"]) {
      if (data["edit"]) UpdateDataSQLite(data, db);
      else submitDataSQLite(data, db);
    } else {
      submitDataSecureStore(data);
    }
    dataRef.current = {};
  } catch (err) {
    console.log(err);
  }
};

const submitShift = async (data: DynamicObject, db: SQLiteAnyDatabase) => {
  try {
    if (!(data["dateStart"] && data["startTime"] && data["endTime"])) {
      return { error: "Missing required date/time fields" };
    }

    const dateObj = new Date(data["dateStart"].toISOString());
    console.log("--------");
    console.log(`this is dateobj ${dateObj}`);

    const startTime = combineDateAndTime(dateObj, data["startTime"]);
    const endTime = combineDateAndTime(dateObj, data["endTime"]);

    const temp = await SecureStore.getItemAsync("HW");
    const extraHoursCountFrom = await SecureStore.getItemAsync("moreHours");
    const firstRate = await SecureStore.getItemAsync("first");
    const lastRate = await SecureStore.getItemAsync("last");

    if (!(temp && extraHoursCountFrom && firstRate && lastRate)) {
      return { error: "Missing secure store values" };
    }
    const HourlyWage: number = parseFloat(temp);
    const extraHourArr: Array<number> = [
      parseFloat(extraHoursCountFrom),
      parseFloat(firstRate),
      parseFloat(lastRate),
    ];
    //time difference
    const dayOfTheWeek = dateObj.getDay();
    const totalHoursWorked = getHoursDifference(startTime, endTime);
    const tarrifArr = await getTaarifArr(db, dayOfTheWeek);

    console.log(tarrifArr);
    console.log(`total is ${totalHoursWorked}`);

    if (!data["rate"]) return { error: "Missing the rate of the shift" };

    const timeArr = await createTimeObj(
      startTime,
      endTime,
      tarrifArr,
      extraHourArr,
      data["rate"]
    );

    if (!timeArr.length) return;

    console.log(timeArr);

    const salary = calcMoneyFromTimeArr(timeArr, HourlyWage);

    const insertValuesString = `
  --- Values to be inserted into ALL_SHIFTS ---
  dayDate: ${dateObj.getDate()}
  monthDate: ${dateObj.getMonth()}
  yearDate: ${dateObj.getFullYear()}
  startTime: ${data["startTime"].toISOString()}
  endTime: ${data["endTime"].toISOString()}
  note: ${data["note"]}
  hoursWorked: ${totalHoursWorked}
  extraHoursCountFrom: ${extraHoursCountFrom}
  firstRate: ${firstRate}
  lastRate: ${lastRate}
  rate: ${data["rate"]}
  totalSalary: ${salary}
  color: ${data["color"]}
  -------------------------------------------
`;

    console.log(insertValuesString);

    await db.execAsync(
      `INSERT INTO ALL_SHIFTS (
    dayDate,monthDate,yearDate,
    startTime,endTime,note,
    hoursWorked,extraHoursCountFrom,firstRate,lastRate,rate,
    totalSalary
  ) VALUES (
    ${dateObj.getDate()},
    ${dateObj.getMonth()},
    ${dateObj.getFullYear()},
    '${data["startTime"]}',     
    '${data["endTime"]}',
    ${data["note"] ? `'${data["note"]}'` : "NULL"},
    ${totalHoursWorked},
    ${extraHoursCountFrom},
    ${firstRate},
    ${lastRate},
    ${data["rate"]},
    ${salary}  )`
    );
  } catch (err) {
    console.log(err);
    return err;
  }
  //insert rest & special
};

const calcMoneyFromTimeArr = (
  arr: Array<{ totalHours: number; rate: number }>,
  HourlyWage: number
) => {
  let sum = 0;
  arr.forEach((obj) => {
    sum += obj.totalHours * ((obj.rate / 100) * HourlyWage);
  });
  return Number(sum.toFixed(1)); // rounded result
};

//MODIDY THIS FU
const calcHours = (
  diff: number,
  totalHours: number,
  extraArr: Array<number>,
  rate: number
) => {
  const lst = [];
  console.log(
    `This is the current interval ${diff} , and that is the total Hours ${totalHours}`
  );
  if (totalHours > extraArr[0]) {
    if (totalHours == diff) lst.push({ totalHours: extraArr[0], rate }); //first time entering

    if (diff - extraArr[0] > 2) {
      lst.push({ totalHours: 2, rate: extraArr[1] });
      lst.push({ totalHours: diff - extraArr[0] - 2, rate: extraArr[2] });
    } else lst.push({ totalHours: diff - extraArr[0], rate: extraArr[1] });
  } else lst.push({ totalHours: diff, rate }); //no extra hours

  return lst;
};

const createTimeObj = async (
  startTime: Date,
  endTime: Date,
  tarrifArr: Array<{
    startDate: Date;
    endDate: Date;
    startHour: any;
    endHour: any;
    extraHoursCountFrom: any;
    firstRate: number;
    rate: number;
    lastRate: number;
  }>,
  extraHourArr: Array<number>,
  rate: number
) => {
  try {
    const arr: Array<{ totalHours: number; rate: number }> = [];
    let current = startTime; //keeps track of the time when looping the array

    let totalCount = 0; //counts the hours that has passed (trigering the extra hours)
    let count = 0; //counts the hours that has passed (trigering the extra hours)
    const dayOfTheWeek = startTime.getDay();

    tarrifArr.forEach((obj) => {
      const forStartDate = dayOfTheWeek - Number(obj["startDate"]);
      const forEndDate = Number(obj["endDate"]) - dayOfTheWeek;

      const Tstart = getTodayWithTime(obj["startHour"], forStartDate, current);
      const Tend = getTodayWithTime(obj["endHour"], forEndDate, current);

      console.log(
        `This is the start of the Taarif ${Tstart}, and that is the end ${Tend}`
      );

      const T_ExtraHoursArr = [
        obj["extraHoursCountFrom"],
        obj["firstRate"],
        obj["lastRate"],
      ];

      let endingPoint = Tend;
      let startingPoint = Tstart;
      let flag = false;

      //if the special rate does not start right away
      if (Tstart.getTime() > current.getTime()) flag = true;

      if (Tend.getTime() > endTime.getTime()) endingPoint = endTime;
      else endingPoint = Tend; //if we have a taarif that excceeds the shift time

      if (Tstart.getTime() < current.getTime()) startingPoint = current;
      else startingPoint = Tstart;

      if (flag) {
        console.log(current, Tstart, "flag is true");
        count = getHoursDifference(current, Tstart);
        totalCount += count;
        arr.push(...calcHours(count, totalCount, extraHourArr, rate));
        current = Tstart;
        flag = false;
      }
      count = getHoursDifference(startingPoint, endingPoint);
      totalCount += count;
      arr.push(...calcHours(count, totalCount, T_ExtraHoursArr, obj["rate"]));
      current = endingPoint;
    });

    if (current != endTime)
      arr.push(...calcHours(count, totalCount, extraHourArr, rate));

    roundTotalHoursInArray(arr);

    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getTaarifArr = async (db: SQLiteAnyDatabase, dayOfTheWeek: number) => {
  try {
    const data = await db.getAllAsync(
      `SELECT * 
FROM WAGE_RATES 
WHERE ${dayOfTheWeek} BETWEEN startDate AND endDate
ORDER BY startDate ASC, startHour ASC;`
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const submitDataSecureStore = async (data: DynamicObject) => {
  console.log("This is my Secure Store ");
  for (const field in data) {
    try {
      const value = data[field as keyof typeof data];
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);
      await SecureStore.setItemAsync(field, stringValue);
    } catch (err) {
      console.error("❌ Failed saving field:", field, err);
    }
  }
  console.log("✅ Done saving all fields");
};

const UpdateDataSQLite = async (data: DynamicObject, db: SQLiteAnyDatabase) => {
  try {
    if (!data)
      await db.execAsync(
        "DELETE FROM WAGE_RATES WHERE id =" + data["id"] + ";"
      );
    await submitDataSQLite(data, db);
  } catch (err) {
    console.log(err);
  }
};

const submitDataSQLite = async (data: DynamicObject, db: SQLiteAnyDatabase) => {
  try {
    if (data.edit) {
      console.log("edit for" + data);
    }
    const table = data.Table;
    delete data.Table;
    delete data.edit;

    if (table == "ALL_SHIFTS") {
      submitShift(data, db);
    } else {
      const arr = ["starthour", "endhour"];
      const fields = Object.keys(data);

      const values = fields.map((field) => {
        let val = data[field as keyof typeof data]!;
        val = val.toString();
        if (arr.includes(field.toLowerCase())) {
          if (val.length != 5) {
            const temp = new Date(val);
            console.log(temp, val);
            const h = String(temp.getHours()).padStart(2, "0");
            const m = String(temp.getMinutes()).padStart(2, "0");
            console.log(h, m);
            val = `${h}:${m}`;
          }
        }
        return `'${val}'`; // wrap in quotes to avoid SQL injection issues
      });

      const sqlString = `INSERT INTO ${table} (${fields.join(
        ","
      )}) VALUES (${values.join(",")})`;
      await db.execAsync(sqlString);
    }
  } catch (err) {
    console.log(err);
  }
};

const devideIntervals = async () => {};

//SQL INSERTS
const create_Table_ALLSHIFTS = async (db: SQLiteAnyDatabase) => {
  try {
    const sqlString = `DROP TABLE IF EXISTS ALL_SHIFTS;

CREATE TABLE ALL_SHIFTS (
    id INTEGER PRIMARY KEY NOT NULL,
    dayDate INTEGER NOT NULL,
    monthDate INTEGER NOT NULL,
    yearDate INTEGER NOT NULL,
    startTime TEXT NOT NULL,
    endTime TEXT NOT NULL,
    endDate TEXT,
    note TEXT,
    hoursWorked REAL NOT NULL,
    extraHoursCountFrom INTEGER NOT NULL,
    firstRate INTEGER NOT NULL,
    lastRate INTEGER NOT NULL,
    totalSalary REAL NOT NULL DEFAULT 0,
    color TEXT NOT NULL DEFAULT 'black'
);
`;
    await db.execAsync(sqlString);
  } catch (err) {
    console.log(err);
  }
};

const create_Table_WAGETATES = async (db: SQLiteAnyDatabase) => {
  const sqlString = `DROP TABLE IF EXISTS WAGE_RATES;

CREATE TABLE WAGE_RATES (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    startDate INTEGER NOT NULL,
    endDate INTEGER NOT NULL,
    startHour TEXT NOT NULL,
    endHour TEXT NOT NULL,
    rate INTEGER NOT NULL,
    extraHoursCountFrom INTEGER NOT NULL,
    firstRate INTEGER NOT NULL,
    lastRate INTEGER NOT NULL
);
`;
  await db.execAsync(sqlString);
};

export { submitData, create_Table_ALLSHIFTS, create_Table_WAGETATES };
