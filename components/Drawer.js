import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OrderList from "../screens/OrderList";
import OrderDetails from "../screens/OrderDetails";
import Dashboard from "../screens/Dashboard";

import Graphs from "../screens/Graphs";

const Draw = createDrawerNavigator();

export default function Drawer() {
  return (
    <Draw.Navigator useLegacyImplementation>
      <Draw.Screen name="Dashboard" component={Dashboard} />
      <Draw.Screen name="Orders" component={OrderList} />
      <Draw.Screen name="Reports" component={Graphs} />
      <Draw.Screen
        options={{
          drawerItemStyle: { display: "none" },
        }}
        name="OrderDetails"
        component={OrderDetails}
      />
    </Draw.Navigator>
  );
}
