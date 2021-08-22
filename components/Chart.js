import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Chart = ({
  currentPrice,
  name,
  logoUrl,
  priceChangePercentage7d,
  symbol,
  sparkline,
}) => {
  return (
    <View style={styles.chartWrapper}>
      <View style={styles.titlesWrapper}>
        <View style={styles.upperTitles}>
          <View style={styles.upperLeftTitle}>
            <Image source={{ uri: logoUrl }} style={styles.image} />
            <Text style={styles.subtitle}>
              {name} ({symbol.toUpperCase()})
            </Text>
          </View>
          <Text style={styles.subtitle}>7d</Text>
        </View>
      </View>
      <View style={styles.lowerTitles}>
        <Text style={styles.boldTitle}>
          ${currentPrice.toLocaleString("en-US", { currency: "USD" })}
        </Text>
        <Text style={styles.title}>
          {" "}
          {priceChangePercentage7d.toFixed(2)}%{" "}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  lowerTitles: {
    paddingHorizontal:9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 40,
  },
});

export default Chart;
