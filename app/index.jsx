import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";

const Home = () => {
  const displayData = async (Month) => {
    const db = await SQLite.openDatabaseAsync("myDataBase");
    const allRows = await db.getAllAsync("SELECT * FROM allShifts");
  };
  useEffect(() => {
    displayData();
  }, []);
  return (
    <Layout style={{ backgroundColor: "#161616", height: "100%" }}>
      <Text style={{ color: "#fff" }}>This is index</Text>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
