import * as React from "react";
import { View, StyleSheet, Text, ScrollView, Modal } from "react-native";
import InfoComp from "../components/InfoComp";

const Dashboard = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Text style={styles.mialzotext}>MiAlzo - Manage Orders</Text>

      <InfoComp
        title="USERS INFO"
        btext11="TOP SELLING PRODUCTS"
        btext21="TOP SELLER VENDORS"
        btext31="LOW STOCK WARNING"
        btext41="DELAY WARNING"
        btext12="Today's top selling products by Mialzo"
        btext22="Today's top selling vendors by Mialzo"
        btext32="Some of products needs to restock"
        btext42="Some product's shipping are in delay, need to ship urgently."
        icon1="cart"
        icon2="account-group"
        icon3="alert"
        icon4="alert"
        bbg1="blue"
        bbg2="green"
        bbg3="goldenrod"
        bbg4="indigo"
      />
      <InfoComp
        title="FINANCE INFO"
        btext11="COMMISSION EARNED"
        btext21="RETURNS"
        btext31="TOP DESTINATION"
        btext41="TOP TRAFFIC SOURCES"
        btext12="Today's commission earnings"
        btext22="Today's product returns"
        btext32="Today's top desination of clients"
        btext42="Today's top traffic from social media"
        icon1="cash"
        icon2="reload"
        icon3="map"
        icon4="traffic-light"
        bbg1="green"
        bbg2="black"
        bbg3="lightblue"
        bbg4="teal"
      />
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mialzotext: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 20,
  },
  userinfo: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  userinfo_touchable_comp: {
    color: "#007bff",
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "bold",
  },
  topselling_comp: {
    backgroundColor: "#007bff",
    borderRadius: 3,
    borderColor: "#007bff",
  },
});
