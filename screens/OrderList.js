import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView, Modal, Pressable, Image,
} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
// import ordersDetails from "../database/ordersDetails.json";
import Orders from "../components/Orders";
import {ActivityIndicator, Text, FAB, Button} from "react-native-paper";
import OrderFilters from "../components/OrderFilters";

import config from "../config.js"
import DropDownPicker from "react-native-dropdown-picker";


const getFilterableAttributes = async () => {
  const paymentMethods = new Set([]);
  const countries = new Set([]);
  const couriers = new Set([]);

  let response = await fetch(`${config.api_url}/api/order-details?fields[0]=Payment&fields[1]=courier&fields[1]=country`)
  response = await response.json();
  response.data.forEach((item) => {
    paymentMethods.add(item.attributes.payment);
    countries.add(item.attributes.country);
    couriers.add(item.attributes.courier);
  })
  return {paymentMethods, couriers, countries};

}

export default function OrderList({ navigation }) {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState(null);
  const [openCountries, setOpenCountries] = useState(false);

  const [couriers, setCouriers] = useState([]);
  const [couriersFilter, setCouriersFilter] = useState(null);
  const [openCouriers, setOpenCouriers] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState(null);
  const [openPaymentMethods, setOpenPaymentMethods] = useState(false);

  const [orderStatusFilter, setOrderStatusFilter] = useState(null);


  
  const fillOrders = () => {

    const filterByCountryString = countryFilter ? `filters[country]=${countryFilter}` : "";
    const filterByCourierString = couriersFilter ? `filters[courier]=${couriersFilter}` : "";
    const filterByPaymentMethodsString = paymentMethodFilter ? `filters[payment]=${paymentMethodFilter}` : "";

    const orderStatusFilterString = orderStatusFilter ? `filters[orderStatus]=${orderStatusFilter}` : null;

    const queryString = `${config.api_url}/api/order-details?populate=*&${orderStatusFilterString}&${filterByCountryString}&${filterByCourierString}&${filterByPaymentMethodsString}`;
    console.log(queryString);
    setOrdersDetails([]);
    setIsEmpty(false);
    setLoadingOrders(true);
    fetch(queryString)
      .then((response) => response.json())
      .then((json) => {
        setOrdersDetails(json.data);
        if(json.data.length === 0) setIsEmpty(true);
        setLoadingOrders(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingOrders(false);
      });
  }
  
  useEffect(() => {
    fillOrders();

    (async ()=>{
      const tempCountriesArray = [{label:"ALL", value: null}];
      const tempCourierArray = [{label:"ALL", value: null}];
      const tempPaymentArray = [{label:"ALL", value: null}];
      const data = await getFilterableAttributes()
      for (const entry of data.countries.values()) {
        tempCountriesArray.push({label: entry, value: entry})
      }
      for (const entry of data.couriers.values()) {
        tempCourierArray.push({label: entry, value: entry})
      }
      for (const entry of data.paymentMethods.values()) {
        tempPaymentArray.push({label: entry, value: entry})
      }
      setCountries(tempCountriesArray);
      setCouriers(tempCourierArray);
      setPaymentMethods(tempPaymentArray);

    })()
  }, [orderStatusFilter]);

  if(!ordersDetails){
    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size={"large"}/>
        </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
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
          onPress={() => {
            setCouriersFilter(null);
            setCountryFilter(null);
            setPaymentMethodFilter(null);
            setOrderStatusFilter(null);
          }}
        >
          <Text style={styles.textcolor}>All </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCouriersFilter(null);
            setCountryFilter(null);
            setPaymentMethodFilter(null);
            setOrderStatusFilter("Pending Payment");
          }}
        >
          <Text style={styles.textcolor}>Pending Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCouriersFilter(null);
            setCountryFilter(null);
            setPaymentMethodFilter(null);
            setOrderStatusFilter("Processing");
          }}
        >
          <Text style={styles.textcolor}>Processing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCouriersFilter(null);
            setCountryFilter(null);
            setPaymentMethodFilter(null);
            setOrderStatusFilter("Cancelled");
          }}
        >
          <Text style={styles.textcolor}>Cancelled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCouriersFilter(null);
            setCountryFilter(null);
            setPaymentMethodFilter(null);
            setOrderStatusFilter("Delivered");
          }}
        >
          <Text style={styles.textcolor}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCouriersFilter(null);
            setCountryFilter(null);
            setPaymentMethodFilter(null);
            setOrderStatusFilter("Ready to Ship");
          }}
        >
          <Text style={styles.textcolor}>Ready to Ship</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCouriersFilter(null);
            setCountryFilter(null);
            setPaymentMethodFilter(null);
            setOrderStatusFilter("On Hold");
          }}
        >
          <Text style={styles.textcolor}>On Hold</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
      <View style={{ flex: 6 , justifyContent:"center"}}>
        {loadingOrders ? (<ActivityIndicator size="large"/>) : null}
        {isEmpty ? (
            <Text style={{
                fontSize:20,
                alignSelf:"center"
              }}
              variant="displayLarge"
            >It's so empty in here :(</Text>) : null}
        <FlatList
          data={ordersDetails}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderDetails", item)}
            >
              <Orders item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top:15,
                right: 20,
              }}
              onPress={()=>setModalVisible(false)}
            >
              <Image source={require('../assets/closeIcon.png')} style={{width:25, height:25}}/>
            </TouchableOpacity>
            <View
                style={{
                  margin:20,
                  marginBottom:40
                }}
            >
              <Text>Payment Method: </Text>
              <DropDownPicker
                  open={openPaymentMethods}
                  value={paymentMethodFilter}
                  items={paymentMethods}
                  setOpen={setOpenPaymentMethods}
                  setValue={setPaymentMethodFilter}
                  setItems={setPaymentMethods}
                  containerStyle={{ width: 300}}
                  dropDownContainerStyle={{ backgroundColor: 'white',zIndex: 100, elevation: 100 }}
              />
            </View>
            <Image source={require('../assets/companyLogo.jpg')} style={{width:100, height:100}}/>
            {/*<Text style={{fontSize:20, color:"indigo", fontWeight: "bold", alignSelf:"start"}}>Filter By </Text>*/}
            <View style={{flexDirection:"column", justifyContent:"space-around"}}>
              <View
                style={{flexDirection:"row", justifyContent:"space-between", elevation:1100, zIndex:1100, marginTop:20}}
              >
                <View>
                  <Text>Country: </Text>
                  <DropDownPicker
                      open={openCountries}
                      value={countryFilter}
                      items={countries}
                      setOpen={setOpenCountries}
                      setValue={setCountryFilter}
                      setItems={setCountries}
                      containerStyle={{ width: 150}}
                      dropDownContainerStyle={{ backgroundColor: 'white',zIndex: 1000, elevation: 1000 }}
                  />
                </View>
                <View>
                  <Text>Courier: </Text>
                  <DropDownPicker
                      open={openCouriers}
                      value={couriersFilter}
                      items={couriers}
                      setOpen={setOpenCouriers}
                      setValue={setCouriersFilter}
                      setItems={setCouriers}
                      containerStyle={{ width: 150}}
                      dropDownContainerStyle={{ backgroundColor: 'white',zIndex: 1000, elevation: 1000 }}

                  />
                </View>
              </View>
            </View>

              <Button
                  onPress={()=> {
                    setModalVisible(!modalVisible);
                    fillOrders();
                  }}
                  style={{position: "absolute", bottom:10, borderBottomWidth:2, borderColor:"indigo"}}
              >Apply Filters</Button>
          </View>
        </View>
      </Modal>
        <FAB style={styles.fab} big icon="filter" onPress={()=>setModalVisible(true)}/>

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
    color: "blue",
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "60%",
  },
  fab: {
    position: "absolute",
    margin: 30,
    right: 0,
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  }
});
