import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";

const productData = [
  {
    name: "Brown Eggs",
    Sales: 1200,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Sweet Fresh Strawberry",
    Sales: 280,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Asparagus",
    Sales: 5276,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Fresh Tomato",
    Sales: 850,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Homemade Bread",
    Sales: 11900,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Legumes",
    Sales: 11921,
    color: "rgb(0,123,255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];
const profitData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [7100021, 4523211, 2212238, 18312330, 19332299, 14328813],
    },
  ],
};
const weeklyData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], // optional
  data: [0.4, 0.6, 0.8, 0.9, 0.2],
};

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Orders Per Month</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [1200, 1600, 1800, 2200, 2500, 3500],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={300}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,123,255, ${opacity})`,
            style: {
              borderRadius: 0,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#007bff",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 0,
          }}
        />

        <Text style={styles.title}>Top Selling Products</Text>
          <PieChart
            data={productData}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={"Sales"}
            backgroundColor={"white"}
            paddingLeft={"15"}
            center={[10, 50]}

          />

        <Text style={styles.title}>Profit per Month</Text>
        <BarChart
          style={{
            marginVertical: 8,
            borderRadius: 0,
          }}
          data={profitData}
          width={Dimensions.get("window").width}
          height={320}
          yAxisLabel="$"
          yAxisInterval={1}
          verticalLabelRotation={30}
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,123,255, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "white",
            },
          }}
        />

        <Text style={styles.title}>Weekly Sales Target</Text>
        <ProgressChart
          data={weeklyData}
          width={Dimensions.get("window").width}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundColor: "blue",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0,123,255, ${opacity})`,
            //labelColor: (opacity = 1) => `rgba(238,130,238, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "10",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          hideLegend={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "top",
    justifyContent: "top  ",
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
