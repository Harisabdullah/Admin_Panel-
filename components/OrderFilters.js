import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import * as React from "react";
import ordersdetails from "../database/ordersdetails.json";
import { useNavigation } from "@react-navigation/native";

export default function OrderFilters() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "lightgrey",
        borderBottomColor: "black",
        borderBottomWidth: 1,
      }}
    >
      <ScrollView horizontal={true}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Orders")}
        >
          <Text style={styles.textcolor}>All ({ordersdetails.length}) </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PendingPayment")}
        >
          <Text style={styles.textcolor}>Pending Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Processing")}
        >
          <Text style={styles.textcolor}>Processing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cancelled")}
        >
          <Text style={styles.textcolor}>Cancelled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Delivered")}
        >
          <Text style={styles.textcolor}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ReadyToShip")}
        >
          <Text style={styles.textcolor}>Ready to Ship</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("OnHold")}
        >
          <Text style={styles.textcolor}>On Hold</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 10,
  },
  textcolor: {
    color: "indigo",
    fontWeight: "bold",
  },
});
