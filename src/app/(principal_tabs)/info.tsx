import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera/legacy";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import { Points } from "@shopify/react-native-skia";
import { getProductInfo } from "../api/getProductInfo";
import { useProductInfo } from "../hooks/use-product-info";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { isValid } from "../helperFunctions/isValid";
import Spacing from "../components/Spacing";

const info = () => {
  const [search, setSearch] = useState("");
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [barcode, setBarcode] = useState("");

  const { data: productInfo, isError, isLoading } = useProductInfo(barcode);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  requestPermission();

  if (scannerEnabled) {
    return (
      <View>
        <Camera
          style={styles.camera}
          onBarCodeScanned={(data) => {
            setBarcode(data.data);
            setScannerEnabled(false);
          }}
        />
        <AntDesign
          onPress={() => setScannerEnabled(false)}
          name="close"
          color="red"
          style={[styles.escapeBtn, { fontSize: 30 }]}
        />
      </View>
    );
  }

  if (isLoading) {
    <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <MaterialCommunityIcons
          onPress={() => setScannerEnabled(true)}
          name="barcode-scan"
          style={{ fontSize: 32 }}
          color="dimgray"
        />
      </View>
      {search != "" && (
        <Button
          title="Search"
          onPress={() => {
            setBarcode("20047214"), setSearch("");
          }}
          color={"royalblue"}
        />
      )}
      {isError ?? (
        <Text style={styles.textErorr}>Sorry we can't find the product</Text>
      )}
      {productInfo && (
        <GestureHandlerRootView>
          <ScrollView>
            <Spacing space={20} />
            <View style={styles.productInfoContainer}>
              {isValid(productInfo.image.imageData) && (
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: productInfo.image.imageData,
                    }}
                    resizeMode="contain"
                    style={{ width: "80%", height: "80%" }}
                  />
                </View>
              )}
              {isValid(productInfo.distributor.names) && (
                <Text>Distributors: {productInfo.distributor.names}</Text>
              )}
              {isValid(productInfo.distributor.manufacturingPlaces) && (
                <Text>
                  Manufacturing places:
                  {productInfo.distributor.manufacturingPlaces}
                </Text>
              )}
              {isValid(productInfo.ingredient.names) && (
                <Text>Ingredients: {productInfo.ingredient.names}</Text>
              )}
              {isValid(productInfo.ingredient.text) && (
                <Text>Description: {productInfo.ingredient.text}</Text>
              )}
              {productInfo.macroNutrient.energyKcal && (
                <Text>
                  Distributors:
                  {productInfo.macroNutrient.energyKcal.toString()}
                </Text>
              )}
              {/* <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                vitae lorem vitae turpis tincidunt scelerisque. Aenean id arcu
                condimentum, vehicula ligula non, scelerisque felis. Proin neque
                mi, viverra vel rutrum sit amet, vestibulum ut lectus. Proin
                tincidunt ac orci in volutpat. Integer ac tristique tortor.
                Phasellus pellentesque rhoncus neque non ultricies. Nulla quis
                enim quis turpis commodo gravida. Nulla ac magna id libero
                finibus gravida. Suspendisse volutpat at dolor sit amet rhoncus.
                Nam sodales, velit eget viverra posuere, nulla lacus
                sollicitudin neque, eget sagittis mi sapien ut justo. Proin nec
                scelerisque nulla, eget vestibulum mi. Mauris finibus a ex in
                imperdiet. Praesent eget nunc vehicula, aliquam ligula nec,
                ultricies massa. Quisque scelerisque orci purus, ac malesuada
                augue accumsan et. Cras lobortis sagittis eros sit amet
                eleifend. Aenean congue dictum efficitur. Nulla quis nisl et
                dolor lobortis mattis vitae quis libero. Pellentesque ex enim,
                consectetur a luctus at, ullamcorper non eros. Ut ornare nisl
                vitae orci mattis, quis placerat tellus hendrerit. Etiam
                fringilla dictum lobortis. Suspendisse massa dolor, sodales id
              </Text> */}
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      )}
    </View>
  );
};

export default info;

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: "100%",
  },
  escapeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  textErorr: {
    fontWeight: "600",
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
  productInfoContainer: {
    gap: 10,
  },
});
