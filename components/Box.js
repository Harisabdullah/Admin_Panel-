import * as React from "react";
import { useState } from "react";

import {View, StyleSheet, Text, FlatList, Image} from "react-native";
import { TouchableOpacity, Modal, Pressable } from "react-native";
import { Button } from "react-native-paper";

export default function Box(props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        backgroundColor: props.bg,
        borderRadius: 3,
        borderColor: "#007bff",
        marginTop: 20,
      }}
    >
      <View
        style={{
          margin: 20,
          marginBottom: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>
          {props.text}
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-start",
          margin: 20,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
            marginLeft: 5,
          }}
        >
          {props.heading}
        </Text>
        <View style={{ alignSelf: "flex-end" }}>
          <Button
            icon={props.icon}
            labelStyle={{ fontSize: 50 }}
            color="white"
          />
        </View>

        <View>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            {props.text2}
          </Text>
        </View>
      </View>

      <View style={{ alignSelf: "center", marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            View all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centeredView}>
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
              {!props.data ? (
                  <View
                    style={{
                      flexDirection:"column",
                      justifyContent:"center",
                      alignItems:"center",
                      flex: 1
                    }}
                  >
                    <Text
                        style={{
                          fontSize:20
                        }}
                    >Nothing yet ... </Text>
                  </View>
              ):null}
              <FlatList
                data={props.data}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>
                      {"\u2B24" + "  " + item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginLeft: 10,
                      }}
                    >
                      {item.stock}
                    </Text>
                  </View>
                )}
              />
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
            </View>
          </View>
        </Modal>
      </View>
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
    fontSize: 20,
    marginBottom: 10,
  },
  userinfo_touchable_comp: {
    color: "#007bff",
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "bold",
  },
  topselling_comp: {},
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
    width:"85%"
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
