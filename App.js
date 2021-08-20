import React, { useState}from "react";
import StoreContex from "./store/store-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

const assetURL = "https://api.kraken.com/0/public/Assets";
export default function App() {
  const fetchData = async () => {
    const res = await fetch(assetURL);
    if (res) {
      throw new Error("Not possible to fetch assets");
    }
    const data = await res.json();
    console.log(data);
    return data.results;
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      error.message;
    }
  }, [fetchData]);

  return (
    <StoreContex.Provider
      value={{
        ethArray: [],
        btcArray: [],
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </StoreContex.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
