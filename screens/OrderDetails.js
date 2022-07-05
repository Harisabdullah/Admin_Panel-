import * as React from "react";
import {useEffect, useState} from "react";
import {ActivityIndicator, Button, TextInput} from "react-native-paper";
import {FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import * as Linking from "expo-linking";
import DropDownPicker from "react-native-dropdown-picker";
import config from "../config.js"

const updateOrderStatus = (orderId, data)=> {
    fetch(`${config.api_url}/api/order-details/${orderId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data
      })
    })
    .then(res => {
      return res.json()
    })
    .then(data => console.log(data))
}


const getOrderDetails = async (orderId) => {
  return fetch(`${config.api_url}/api/order-details/${orderId}`)
    .then(res => res.json())
    .then(res => res.data.attributes)
}


export default function OrderDetails({ route, navigation }) {

  const orderId = route.params.id;
  let props = route.params.attributes;



  props.note = props.note || "";
  const [note, setNote] = useState(props.note);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  
  const [customer, setCustomer] = useState(null);

  const [couriers, setCouriers] = useState([
    {label:"TCS", value:"TCS"},
    {label:"DHL", value:"DHL"}
  ]);
  const [openCouriers, setOpenCouriers] = useState(false);
  const [courier, setCourier] = useState(props.courier);

  const [paymentMethods, setPaymentMethods] = useState([
    { label: "Amazon Payments", value: "Amazon Payments" },
    { label: "Direct Bank Transfer", value: "Direct Bank Transfer" },
    { label: "Cash On Delivery", value: "Cash On Delivery" }
  ]);
  const [openPaymentMethods, setOpenPaymentMethods] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(props.payment);

  const [possibleOrderStatus, setPossibleOrderStatus] = useState([
    { label: "Pending Payment", value: "Pending Payment" },
    { label: "On Hold", value: "On Hold" },
    { label: "Processing", value: "Processing" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Ready to Ship", value: "Ready to Ship" }
  ]);
  const [openPossibleOrderStatus, setOpenPossibleOrderStatus] = useState(false);
  const [orderStatus, setOrderStatus] = useState(props.orderStatus);

  const [modalVisible, setModalVisible] = useState(false);

  console.log(possibleOrderStatus);
  
  useEffect(() => {
    (async()=>{
      const order = await getOrderDetails(orderId);
      props = order;
    })()
    fetch(`${config.api_url}/api/users?filters[username]=${props.name}`)
        .then((res) => res.json())
        .then((res) => {
          setCustomer(res[0]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

    if (!customer) return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size={"large"}/>
        </View>
    )


  
  
  if(orderStatus !== props.orderStatus || paymentMethod !== props.payment || courier !== props.courier) {
    updateOrderStatus(orderId, {orderStatus: orderStatus, payment: paymentMethod, courier: courier});
    (async()=>{
      props = await getOrderDetails(orderId);
    })();
  }

  return (
    <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "white",
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textcolor}>General</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{setModalVisible(true)}}>
          <Text style={styles.textcolor}>Order Notes</Text>
        </TouchableOpacity>
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
            <Text style={{
              fontSize: 20, fontWeight:"bold", color:"red", width: "50%",
              borderBottomWidth:2, borderColor:"indigo", textAlign:"center",
              position: "absolute", top: "5%"
            }}>Order Notes</Text>
            {!isEditNoteOpen ?
                (<View
                    style={{position: "absolute", bottom: 0}}
                ><Button
                    labelStyle={{fontSize: 16}}
                    icon="square-edit-outline"
                    onPress={()=>setIsEditNoteOpen(true)}
                >Edit</Button></View>)
                :
                (<View
                  style={{position: "absolute", bottom: 0}}
                ><Button
                    onPress={()=>{
                      setIsEditNoteOpen(false);
                      updateOrderStatus(orderId, {note: note});
                    }}
                >Save</Button></View>)}
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
            {/*<Image source={require('../assets/companyLogo.jpg')} style={{width:100, height:100}}/>*/}

            <View style={{
              marginTop: 20
            }}>
              {isEditNoteOpen ? (
                  <TextInput
                      value={note}
                      onChangeText={(text)=>setNote(text)}
                      style={{
                        borderWidth: 1,
                        borderColor: "indigo",
                        padding: 10,
                        margin: 10,
                        borderRadius: 10,
                        width: "100%",
                        height: 30,
                      }}
                  />
                  ) :
                  (note ? (<Text
                      style={{fontSize:16}}
                  >{note}</Text>) : <Text>No notes yet</Text>)
              }
            </View>

          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent:"space-between",
          backgroundColor: "white",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "indigo",
            marginBottom: 20,
          }}
        >
          Order Status
        </Text>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <DropDownPicker
              open={openPaymentMethods}
              value={paymentMethod}
              items={paymentMethods}
              setOpen={setOpenPaymentMethods}
              setValue={setPaymentMethod}
              setItems={setPaymentMethods}
              containerStyle={{ width: "42%", marginRight:5}}
              dropDownContainerStyle={{padding:10, backgroundColor: 'white',zIndex: 100, elevation: 100 }}
          />
          <DropDownPicker
              open={openCouriers}
              value={courier}
              items={couriers}
              setOpen={setOpenCouriers}
              setValue={setCourier}
              setItems={setCouriers}
              containerStyle={{ width: "25%"}}
              dropDownContainerStyle={{padding:10, backgroundColor: 'white',zIndex: 1000, elevation: 1000 }}
          />
          <DropDownPicker
              open={openPossibleOrderStatus}
              value={orderStatus}
              items={possibleOrderStatus}
              setOpen={setOpenPossibleOrderStatus}
              setValue={setOrderStatus}
              setItems={setPossibleOrderStatus}
              containerStyle={{ width: "31%", marginLeft: 5}}
              dropDownContainerStyle={{padding:10, backgroundColor: 'white',zIndex: 1000, elevation: 1000 }}
          />

        </View>
        <Button
          style={{marginBottom:15}}
          mode="contained"
          onPress={()=>{
            console.log(orderId, orderStatus);
            setOrderStatus("Delivered");
          }}
        >Complete Order</Button>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "white",
          marginTop: 20,
          justifyContent: "space-around",
          paddingLeft: 20,
          flexDirection: "row",
          zIndex: -1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Order ID: <Text style={{ color: "black" }}> #{props.orderID} </Text>
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Ordered on:{" "}
            <Text style={{ color: "black" }}> {props.orderDate} </Text>
          </Text>
          {/* <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Order Total:{" "}
            <Text style={{ color: "black" }}> ${total.toFixed(2)} </Text>
          </Text> */}
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Payment: <Text style={{ color: "black" }}> {props.payment} </Text>
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Shipping Charges:{" "}
            <Text style={{ color: "black" }}> ${props.shipment} </Text>
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Total Orders by Customer:{" "}
            <Text style={{ color: "black" }}> {customer.totalOrders} </Text>
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Completed Orders:{" "}
            <Text style={{ color: "black" }}> {customer.completedOrders} </Text>
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Cancelled Orders:{" "}
            <Text style={{ color: "black" }}> {customer.cancelledOrders}</Text>
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Returned Orders:{" "}
            <Text style={{ color: "black" }}> {customer.returnedOrders} </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flex: 3,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            marginLeft: 20,
            borderBottomWidth: 1,
            borderBottomColor: "black",
          }}
        >
          Items in order:
        </Text>
        <FlatList
          data={props.Products}
          renderItem={({ item }) => (
            <ProductInfo item = {item}/>
          )}
        />
      </View>
      <View style={{ flex: 1, marginTop: 20, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "indigo",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Shipping
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "indigo",
            borderWidth: 2,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}>
            Billing
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "white",
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1.5,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                padding: 10,
                fontWeight: "bold",
                color: "indigo",
              }}
            >
              {customer.username}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Button
                icon="map-marker"
                labelStyle={{ fontSize: 30 }}
                style={{
                  marginRight: -15,
                  marginTop: 15,
                }}
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/dir/${props.State},${props.City},${props.Address}`
                  )
                }
              />

              <Button
                icon="square-edit-outline"
                labelStyle={{ fontSize: 30 }}
                style={{
                  marginRight: -15,
                  marginTop: 15,
                }}
              />

              <Button
                icon="whatsapp"
                labelStyle={{ fontSize: 30 }}
                style={{
                  marginRight: -15,
                  marginTop: 15,
                }}
                onPress={() => {
                  Linking.openURL(
                    `https://api.whatsapp.com/send?phone=${props.phone}`
                  );
                }}
              />
              <Button
                icon="email-plus"
                labelStyle={{ fontSize: 30 }}
                style={{
                  marginRight: -15,
                  marginTop: 15,
                }}
                onPress={() => {
                  Linking.openURL(`mailto:${props.email}`);
                }}
              />
              <Button
                icon="phone"
                labelStyle={{ fontSize: 30 }}
                style={{
                  marginRight: -15,
                  marginTop: 15,
                }}
                onPress={() => {
                  Linking.openURL(`tel:${props.phone}`);
                }}
              />
            </View>
          </View>

          <View style={{ flex: 3, justifyContent: "space-around" }}>

              <Text style={styles.text1}>{props.address}</Text>
            <Text style={styles.text1}>{props.city}</Text>
            <Text style={styles.text1}>
              {props.state}, {props.country} - {props.zip}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const ProductInfo = (props) => {
  const [product, setProduct] = useState(null);
  
  props = props.item;
  
  useEffect(() => {
    fetch(`${config.api_url}/api/products/${props.id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.data);
      });
  }, []);
  
  if(!product) return <Text>Loading ...</Text>;
  if(product.length === 0) return <Text>No products</Text>;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "indigo",
          marginLeft: 20,
        }}
      >
        {product.attributes.title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "indigo",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {product.attributes.price}$
      </Text>
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
  text1: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "bold",
    color: "indigo",
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
    width:"70%"
  },

});
