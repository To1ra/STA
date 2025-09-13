import { StyleSheet, View, FlatList } from "react-native";
import Shift from "./Shift";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import React from "react";
import { ShiftData } from "../../utils/types";

interface ContentProps {
  month: number;
  year: number;
}

const Content: React.FC<ContentProps> = ({ month, year }) => {
  const [output, setOutput] = useState<ShiftData[]>([]);
  const db = useSQLiteContext();

  const del = async (id: string | number) => {
    await db.execAsync("DELETE FROM ALL_SHIFTS WHERE id =" + id + ";");
    console.log("hey");
    await myFetch();
  };

  const myFetch = async () => {
    try {
      const allRows = await db.getAllAsync(
        "SELECT * FROM All_SHIFTS WHERE monthDate=" +
          month +
          " AND YearDate=" +
          year
      );
      console.log(allRows, month, year);
      // Transform the data to match the expected structure
      const transformedRows = allRows.map((row: any) => ({
        id: row.id,
        yearDate: row.yearDate || year,
        monthDate: row.monthDate || month,
        dayDate: row.dayDate || 1,
        startTime: row.startTime,
        endTime: row.endTime,
        rate: row.rate || 0,
        extraHoursCountFrom: row.extraHoursCountFrom || 0,
        firstRate: row.firstRate || 0,
        lastRate: row.lastRate || 0,
        hoursWorked: row.hoursWorked || 0,
        newDay:
          row.startTime.toString().split(" ")[2] !=
          row.endTime.toString().split(" ")[2]
            ? "*"
            : "",
        allShiftRates: row.allShiftRates || 0,
        totalSalary: row.totalSalary,
      }));
      setOutput(transformedRows);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    myFetch();
  }, [month, year]);
  return (
    <View>
      <FlatList
        data={output}
        renderItem={({ item }) => <Shift data={item} del={del} />}
        keyExtractor={(item) => String(item.id)}
      />
    </View>

    //
  );
};

export default Content;

const styles = StyleSheet.create({});
