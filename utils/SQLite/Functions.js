import * as SecureStore from "expo-secure-store";
import { getHoursDifference, getTodayWithTime } from "../TestFunctions";
import { days } from "../../constans/Constans";

const submitData = (db, dataRef) => {
  try {
    if (!dataRef?.current) return;
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

const submitShift = async (data, db) => {
  const dateObj = new Date(
    data["yearDate"],
    data["monthDate"],
    data["dayDate"]
  );

  const startTime = new Date(data["startTime"]);
  const endTime = new Date(data["endTime"]);
  const HorlyWage = await SecureStore.getItemAsync("HW");

  //time difference
  const dayOfTheWeek = dateObj.getDay();
  const totalHoursWorked = getHoursDifference(date1, date2);

  const tarrifArr = getTaarifArr(db, dayOfTheWeek);

  const timeArr = createTimeObj(startTime, endTime, tarrifArr);

  //insert rest & special
};

const calcHours = (start, end, count, extraArr, rate) => {
  const obj = {};
  const diff = count + getHoursDifference(start, end);
  if (diff > extraArr[0]) {
    if (diff - extraArr[0] > 2) {
      obj.push({ totalHours: extraArr[0], rate });
      obj.push({ totalHours: 2, rate: extraArr[1] });
      obj.push({ totalHours: diff - extraArr[0] - 2, rate: extraArr[2] });
    } else {
      obj.push({ totalHours: extraArr[0], rate });
      obj.push({ totalHours: diff - extraArr[0], rate: extraArr[1] });
    }
  } else obj.push({ totalHours: diff, rate });

  return obj;
};

const createTimeObj = async (startTime, endTime, tarrifArr) => {
  const arr = []; //empty arr
  let current = startTime; //keeps track of the time when looping the array
  let count = 0; //counts the hours that has passed (trigering the extra hours)

  const extraHour = [
    //data for normal extra hours
    await SecureStore.getItemAsync("moreHours"),
    await SecureStore.getItemAsync("first"),
    await SecureStore.getItemAsync("last"),
  ];

  tarrifArr.forEach((element) => {
    data.forEach((element) => {
      const temp1 = getTodayWithTime(data["startHour"]);
      const temp2 = getTodayWithTime(data["endHour"]);

      let allArgs = [];
      let endAt = null;
      // if (data["endHour"] == data["endDate"]) //make it work fine afer modifing the database
      //   temp2.setDate(temp2.getDate() + 1);

      if (temp1 > endTime || current > temp2 || current == endTime)
        return; //if its not logical
      else if (temp1 >= current && temp2 <= endTime) {
        arr.push(calcHours(current, temp1, count, extraHour, 1)); //start from normal rate before taarif
        count += getHoursDifference(current, temp1);
        current = temp1;
        endAt = temp2;
      }
      //if it start after the shif but ends after
      //
      else if (temp1 >= current && temp2 >= endTime) {
        current = temp1;
        count += getHoursDifference(startTime, current);
        arr.push(calcHours(current, temp1, count, extraHour, 1)); //start from normal rate before taarif
        startingFrom = temp1;
        endingAt = endTime;
      }
      //
      // if it starts before the shift but ends within
      //
      else if (temp1 <= current && temp2 <= endTime)
        arr.push({ start: current, end: temp2, rate: data["rate"] });
      //
      // if it starts before the shift but ends after
      //
      else if (temp1 <= current && temp2 >= endTime)
        arr.push({ start: current, end: endTime, rate: data["rate"] });

      arr.push(
        calcHours(
          startingFrom,
          endingAt,
          [
            data["extraHorusCount"],
            data["firstExtraRate"],
            data["lastExtraRate"],
          ],
          data["rate"]
        )
      );
      current = endingAt;
    });
  }); //loop and enter segments based on the Taarif arr and pay attention for extra hours, increment the current aswell

  return arr;
};

const getTaarifArr = async (db, dayOfTheWeek) => {
  const data = db.getAllAsync(
    `SELECT * FROM WAGE_RATES WHERE startDate >=${dayOfTheWeek} AND endDate <= ${dayOfTheWeek}`
  );

  return data;
};

const submitDataSecureStore = async (data) => {
  console.log("This is my Secure Store ");
  for (const field in data) {
    try {
      await SecureStore.setItemAsync(field, data[field]);
    } catch (err) {
      console.error("❌ Failed saving field:", field, err);
    }
  }
  console.log("✅ Done saving all fields");
};

const UpdateDataSQLite = async (data, db) => {
  try {
    await db.execAsync("DELETE FROM WAGE_RATES WHERE id =" + data["id"] + ";");
    await submitDataSQLite(data, db);
  } catch (err) {
    console.log(err);
  }
};

const submitDataSQLite = async (data, db) => {
  try {
    if (data.edit) {
      console.log("edit for" + data);
    }
    const table = data.Table;
    delete data.Table;
    delete data.edit;

    if (table == "ALL_SHIFTS") {
    } else {
      const arr = ["starthour", "endhour"];
      const fields = Object.keys(data);
      const values = fields.map((field) => {
        let val = data[field];
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

export { submitData };
