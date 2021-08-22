import React, { useState, useMemo, useRef } from "react";
import StoreContex from "./store/store-context";
import ListItems from "./components/ListItems";
import { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, onPress } from "react-native";
import { SAMPLE_DATA } from "./assets/data/sampleData";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const assetsURL = "https://api.kraken.com/0/public/Assets";
const assetsPairBTCUSD = "https://api.kraken.com/0/public/Ticker?pair=BTCUSD";
const assetsPairETHUSD = "https://api.kraken.com/0/public/Ticker?pair=ETHUSD";

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider} />
  </>
);

export default function App() {
  const [listBtc, setListBtc] = useState();
  const [listHtc, setListHtc] = useState();
  // ref
  const bottomSheetModalRef = useRef(null) ;
  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  const fetchAssetsBtc = async () => {
    try {
      const res = await fetch(assetsPairBTCUSD);

      if (!res) {
        throw new Error("Not possible to fetch assets");
      }
      const data = await res.json();
      setListBtc(data.result);
      console.log("results", data.result);

      return data;
    } catch (error) {
      error.message;
    }
  };
  const fetchAssetsHtc = async () => {
    try {
      const res = await fetch(assetsPairBTCUSD);

      if (!res) {
        throw new Error("Not possible to fetch assets");
      }
      const data = await res.json();
      setListHtc(data.result);
      console.log("results", data.result);

      return data;
    } catch (error) {
      error.message;
    }
  };

  useEffect(() => {
    fetchAssetsBtc();
    fetchAssetsHtc();
  }, []);

  const openModal = () => {
      bottomSheetModalRef.current?.present();
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={SAMPLE_DATA}
          renderItem={({ item }) => (
            <ListItems
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              logoUrl={item.image}
              onPress={()=>openModal()}
            />
          )}
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>
      
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 15,
    marginTop: 16,
  },
});
