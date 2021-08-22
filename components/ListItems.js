import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";



 
const ListItems = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  onPress,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#FF3B30";
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.image} />
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>
              ${currentPrice.toLocaleString("en-US", { currency: "USD" })}
            </Text>
            <Text style={[styles.subtitle, { color: priceChangeColor }]}>
              {priceChangePercentage7d.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightWrapper: {
    alignItems: "flex-end",
  },
  image: {
    height: 48,
    width: 48,
  },
  titlesWrapper: {
    marginLeft: 10,
    
  },

  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#A9ABB1",
  },
});

export default ListItems;
