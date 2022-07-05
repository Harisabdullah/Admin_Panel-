import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { useState,useEffect } from "react";

import { TouchableOpacity } from "react-native";
import Box from "./Box";

import productslist from "../database/productslist.json";
// import { useEffect } from "react/cjs/react.production.min";
import ordersDetails from "../database/ordersdetails.json";
import config from "../config.js"
const getTopElements = () => {
  const titles = productslist.map((item) => item.title);

  const occurrences = titles.map((title) => {
    let count = 0;
    // ordersDetails.forEach((item) => {
    //   item = item.attributes;
    //   item.products.forEach((item) => {
    //     count = item.title === title ? ++count : count;
    //   });
    // });
    return { title: title, count: count };
  });
  occurrences.sort(function (a, b) {
    return b.count - a.count;
  });
  const top = occurrences[0];
  const topEl = occurrences.filter((item) => {
    return item.count === top.count;
  });
  return topEl;
};

const getPrice = (title) => {
  const product = productslist.filter((item) => item.title === title);
  return product[0].price;
};

const lowStock = productslist.filter((item) => item.stock < 10);
lowStock.sort(function (a, b) {
  return a.stock - b.stock;
});


const getStartDate = (daysOffset) =>{
  console.log(daysOffset);
  return new Date(Date.now()-(daysOffset*1000*60*60*24)).toISOString()
  // 1 * 1000 = 1000 * 60 = 60000 * 60 = 3600000 * 24 = 1 day
}


export default function InfoComp(props) {
  // const [modalVisible, setModalVisible] = useState(false);
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [daysOffsetFromNow, setDaysOffsetFromNow] = useState(30);

  const fetchOrders = (date) => {
    fetch(`${config.api_url}/api/order-details?filters[orderDate][$gte]=${date}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json.data);
          setOrdersDetails(json.data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    fetchOrders(getStartDate(daysOffsetFromNow)) // Last Month
  }, [daysOffsetFromNow]);

  const topEl = getTopElements(ordersDetails);
  const topElPrice = getPrice(topEl[0].title);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Text style={styles.userinfo}>{props.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          onPress={()=>{
            const date = getStartDate(0);
            fetchOrders(date); // 0 days Back
          }}
        >
          <Text style={styles.userinfo_touchable_comp}>TODAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
              const date = getStartDate(1);
              fetchOrders(date); // 1 days Back
            }}
        >
          <Text style={styles.userinfo_touchable_comp}>YESTERDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
              const date = getStartDate(7);
              fetchOrders(date); // 7 days Back
            }}
        >
          <Text style={styles.userinfo_touchable_comp}>LAST 7 DAYS</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
              const date = getStartDate(30);
              fetchOrders(date); // 30 days Back
            }}
        >
          <Text style={styles.userinfo_touchable_comp}>THIS MONTH</Text>
        </TouchableOpacity>
      </View>

      <Box
        bg={props.bbg1}
        icon={props.icon1}
        text={props.btext11}
        text2={props.btext12}
        heading={`${topEl[0].title} $${topElPrice}`}
        data={topEl}
      />
      <Box
        bg={props.bbg2}
        icon={props.icon2}
        text={props.btext21}
        text2={props.btext22}
      />
      <Box
        bg={props.bbg3}
        icon={props.icon3}
        text={props.btext31}
        text2={props.btext32}
        heading={`${lowStock[0].title} \nStock Remaining: ${lowStock[0].stock}`}
        data={lowStock}
      />
      <Box
        bg={props.bbg4}
        icon={props.icon4}
        text={props.btext41}
        text2={props.btext42}
      />
    </View>
  );
}
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
    fontSize: 30,
    margin: 10,
    marginTop: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
