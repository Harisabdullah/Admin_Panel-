import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useEffect } from "react";

export default function Orders(props) {
  props = props.item.attributes;

  // let total = 0;
  // for (let i = 0; i < props.products.length; i++) {
  //   total += props.products[i].price;
  // }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 5,
        borderBottomWidth: 1,
        padding: 20,
      }}
    >
      <View style={{ flex: 2 }}>
        <Text style={styles.text}>
          OrderID: <Text style={styles.nest}>#{props.orderID}</Text>
        </Text>
        <Text style={styles.text}>
          Order Date:<Text style={styles.nest}> {props.orderDate}</Text>
        </Text>
        <Text style={styles.text}>
          Payment:<Text style={styles.nest}>{props.payment}</Text>
        </Text>
        <Text style={styles.text}>
          Order Current Status:
          <Text style={styles.nest}> {props.orderStatus}</Text>
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>
          <Text style={styles.nest}>{props.name}</Text>
        </Text>
        {/* <Text style={styles.text}>
          Total:
          <Text style={styles.nest}>{total.toFixed(2)}$</Text>
        </Text> */}
        <Text style={styles.text}>
          Items:<Text style={styles.nest}> {props.Products.length}</Text>
        </Text>
        <Text style={styles.text}>
          Shipping Charges:<Text style={styles.nest}> {props.items}</Text>
        </Text>
        <Text style={styles.text}>
          Courier:<Text style={styles.nest}> {props.courier}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "grey",
  },
  nest: {
    color: "indigo",
  },
});
