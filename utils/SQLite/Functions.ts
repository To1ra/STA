import * as SecureStore from "expo-secure-store";
import {
  getHoursDifference,
  getTodayWithTime,
  roundTotalHoursInArray,
  combineDateAndTime,
} from "../TestFunctions";
import { SQLiteDatabase } from "expo-sqlite";
import { DynamicObject } from "../types";

const submitData = async (
  db: SQLiteDatabase,
  dataRef: React.RefObject<DynamicObject> //you get all the values needed out of the ref
) => {
  try {
    if (!dataRef.current) return;

    const data = dataRef.current;

    if (data["Table"]) {
      if (data["edit"]) {
        // first remove the row and then insert new one with the new values.
        if (data["id"]) {
          await db.execAsync(
            "DELETE FROM WAGE_RATES WHERE id =" + data["id"] + ";"
          );
        }
        await submitDataSQLite(data, db);
      } else submitDataSQLite(data, db);
    } else {
      submitDataSecureStore(data);
    }
    dataRef.current = {};
  } catch (err) {
    console.log(err);
  }
};

const submitShift = async (data: DynamicObject, db: SQLiteDatabase) => {
  try {
    if (!(data["dateStart"] && data["startTime"] && data["endTime"])) {
      return { error: "Missing required date/time fields" };
    }

    const dateObj = new Date(data["dateStart"].toISOString());

    console.log(`dateobj ${dateObj}`);

    const startTime = combineDateAndTime(dateObj, data["startTime"]); //I have to store time as a date so I use that function
    const endTime = combineDateAndTime(dateObj, data["endTime"]);

    const temp = await SecureStore.getItemAsync("HW");
    const extraHoursCountFrom = await SecureStore.getItemAsync("moreHours");
    const firstRate = await SecureStore.getItemAsync("first");
    const lastRate = await SecureStore.getItemAsync("last");

    if (!(temp && extraHoursCountFrom && firstRate && lastRate))
      return { error: "Missing secure store values" };

    const HourlyWage: number = parseFloat(temp);
    const extraHourArr: Array<number> = [
      parseFloat(extraHoursCountFrom),
      parseFloat(firstRate),
      parseFloat(lastRate),
    ];
    //time difference
    const dayOfTheWeek = dateObj.getDay();
    const totalHoursWorked = getHoursDifference(startTime, endTime);

    const tarrifArr = await getTaarifArr(db, dayOfTheWeek); //inspect here

    console.log(tarrifArr);
    console.log(`total is ${totalHoursWorked}`);

    if (!data["rate"]) return { error: "Missing the rate of the shift" };

    const timeArr = await createTimeObj(
      startTime,
      endTime,
      tarrifArr,
      extraHourArr,
      totalHoursWorked,
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
    endDate: number;
    startDate: number;
    startHour: Date;
    endHour: Date;
    extraHoursCountFrom: number;
    firstRate: number;
    rate: number;
    lastRate: number;
  }>,
  extraHourArr: Array<number>,
  totalHours: number,
  rate: number
) => {
  try {
    const arr: Array<{ totalHours: number; rate: number }> = [];
    let current = startTime; //keeps track of the time when looping the array
    let totalCount = 0; //counts the hours that has passed (trigering the extra hours)
    let count = 0; //counts the hours that has passed (trigering the extra hours)
    const dayOfTheWeek = startTime.getDay();

    if (tarrifArr.length == 0) {
      //if there`s no taarif involved
      arr.push(...calcHours(totalHours, totalHours, extraHourArr, rate));
    }

    tarrifArr.forEach((obj) => {});

    roundTotalHoursInArray(arr);
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getTaarifArr = async (db: SQLiteDatabase, dayOfTheWeek: number) => {
  try {
    const data = await db.getAllAsync(
      `SELECT * 
FROM WAGE_RATES 
WHERE ${dayOfTheWeek} BETWEEN startDate AND endDate
ORDER BY startDate ASC, startHour ASC;`
    );
    return data as any[];
  } catch (err) {
    console.log(err);
    return [];
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

const submitDataSQLite = async (data: DynamicObject, db: SQLiteDatabase) => {
  try {
    if (data.edit) console.log("edit for" + data);

    const table = data.Table;

    delete data.Table;
    delete data.edit;

    if (table == "ALL_SHIFTS") {
      submitShift(data, db);
    } else {
      //Later I`ll have more tables so need to make it something else
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
const create_Table_ALLSHIFTS = async (db: SQLiteDatabase) => {
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

const create_Table_WAGETATES = async (db: SQLiteDatabase) => {
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
