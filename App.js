import React, { useState, useMemo, useRef } from "react";
import StoreContex from "./store/store-context";
import ListItems from "./components/ListItems";
import { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { SAMPLE_DATA } from "./assets/data/sampleData";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Chart from "./components/Chart";

const assetsURL = "https://api.kraken.com/0/public/Assets";
const assetsPairBTCUSD =
  "https://api.kraken.com/0/public/Ticker?pair=BTCUSD,ETHUSD";
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
  const [listBtc, setListBtc] = useState([]);
  const [listEth, setListEth] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  // ref
  const bottomSheetModalRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["35%"], []);

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
  const fetchAssetsEth = async () => {
    try {
      const res = await fetch(assetsPairETHUSD);

      if (!res) {
        throw new Error("Not possible to fetch assets");
      }
      const data = await res.json();
      setListEth(data.result);
      console.log("results", data.result);

      return data;
    } catch (error) {
      error.message;
    }
  };

  useEffect(() => {
    fetchAssetsBtc();
    fetchAssetsEth();
  }, []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  return (
    <StoreContex.Provider value={{ ethArray: [listEth], btcArray: [listBtc] }}>
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
                onPress={() => openModal(item)}
              />
            )}
            ListHeaderComponent={<ListHeader />}
          />
        </SafeAreaView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheetModal}
        >
          { selectedCoinData ? (
          <Chart
            currentPrice={selectedCoinData.current_price}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
            sparkline={selectedCoinData?.sparkline_in_7d.price}
          />
        ) : null}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </StoreContex.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheetModal: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});