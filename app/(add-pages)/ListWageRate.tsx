import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import ListItem from "../../components/List/ListItem";
import { Ionicons } from "@expo/vector-icons";
import { WageRateData } from "../../utils/types";

const WageRate: React.FC = () => {
  const db = useSQLiteContext();
  const [output, setOutput] = useState<WageRateData[]>([]);
  const [vis, setVis] = useState(false);

  const delRecord = async (id: string | number) => {
    try {
      await db.execAsync(`DELETE FROM WAGE_RATES WHERE id=${id}`);
      setVis(false);
      await myFetch();
    } catch (err) {
      console.log(err);
    }
  };
  
  const myFetch = async () => {
    try {
      const allRows: WageRateData[] = await db.getAllAsync(
        "SELECT * FROM WAGE_RATES"
      );
      // Transform the data to match the expected structure
      const transformedRows = allRows.map(row => ({
        id: row.id,
        name: row.name || `Wage Rate ${row.id}`,
        startDate: row.startDate || '',
        startHour: row.startHour || '',
        endDate: row.endDate || '',
        endHour: row.endHour || '',
        rate: row.rate || '0'
      }));
      setOutput(transformedRows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    myFetch();
  }, []);

  return (
    <View>
      <View>
        <FlatList
          data={output}
          renderItem={({ item }) => (
            <>
              <ListItem data={item} editRoute={"WageRate"} />
              {vis ? (
                <Ionicons
                  name="remove-circle-sharp"
                  size={15}
                  onPress={() => delRecord(item.id)}
                />
              ) : null}
            </>
          )}
          keyExtractor={(item: WageRateData) => item.id.toString()}
        />
        <Ionicons
          name="trash-outline"
          size={30}
          onPress={() => setVis(!vis)}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
    </View>
  );
};

export default WageRate;

const styles = StyleSheet.create({});
