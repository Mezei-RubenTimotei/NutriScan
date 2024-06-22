import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TextInputComponent,
} from "react-native";
import { Camera, CameraType } from "expo-camera/legacy";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import { getProductInfo } from "../api/getProductInfo";
import { useProductInfo } from "../hooks/use-product-info";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { isValid } from "../helperFunctions/isValid";
import Spacing from "../components/Spacing";
import { mealType } from "../dataTypes/types";
import { usePostMeal } from "../hooks/use-postMeal";
import reduceMealAmount from "../helperFunctions/reduceMealAmount";

const info = () => {
  const [search, setSearch] = useState("");
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [barcode, setBarcode] = useState(""); //20047214
  const [grams, setGrams] = useState("");
  const space = "  ";

  const { data: productInfo, isError, isLoading } = useProductInfo(barcode);
  const { mutate } = usePostMeal();

  const [permission, requestPermission] = Camera.useCameraPermissions();
  requestPermission();

  const handleAddToList = () => {
    if (isNaN(+grams)) alert("please type an amount");
    else {
      const mealValues100g: mealType = {
        name: productInfo.name,
        totalKCal: productInfo.macroNutrient.energyKcal,
        carbohydrates: productInfo.macroNutrient.carbohydrates,
        proteins: productInfo.macroNutrient.proteins,
        fats: productInfo.macroNutrient.fat,
      };
      const mealToAdd = reduceMealAmount(mealValues100g, parseInt(grams));
      mutate(mealToAdd);
      setGrams("");
    }
  };

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
    return <ActivityIndicator />;
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
            setBarcode(search), setSearch(""); //modify
          }}
          color={"royalblue"}
        />
      )}
      {isError && (
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
                    style={{ width: 200, height: 300 }}
                  />
                </View>
              )}
              {isValid(productInfo.name) && (
                <Text style={styles.textInformation}>
                  Name:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.name}
                  </Text>
                </Text>
              )}
              {isValid(productInfo.barcode) && (
                <Text style={styles.textInformation}>
                  Barcode:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.barcode}
                  </Text>
                </Text>
              )}
              {isValid(productInfo.brandName) && (
                <Text style={styles.textInformation}>
                  Brand Name:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.brandName}
                  </Text>
                </Text>
              )}
              {isValid(productInfo.distributor.names) && (
                <Text style={styles.textInformation}>
                  Distributors:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.distributor.names}
                  </Text>
                </Text>
              )}
              {isValid(productInfo.distributor.manufacturingPlaces) && (
                <Text style={styles.textInformation}>
                  Manufacturing places:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.distributor.manufacturingPlaces}
                  </Text>
                </Text>
              )}
              {isValid(productInfo.ingredient.names) && (
                <Text style={styles.textInformation}>
                  Ingredients:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.ingredient.names}
                  </Text>
                </Text>
              )}
              {isValid(productInfo.ingredient.text) && (
                <Text style={styles.textInformation}>
                  Description:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.ingredient.text}
                  </Text>
                </Text>
              )}
              {isValid(productInfo.expiresAt) && (
                <Text style={styles.textInformation}>
                  Expire date:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.expiresAt}
                  </Text>
                </Text>
              )}
              {productInfo.weightValue && (
                <Text style={styles.textInformation}>
                  Weight:
                  <Text style={styles.textInformationValue}>
                    {space + productInfo.weightValue.toString() + space}
                    {productInfo.weightType}
                  </Text>
                </Text>
              )}
              {productInfo && (
                <View style={{ alignItems: "center", padding: 10 }}>
                  <Text
                    style={[
                      styles.textInformation,
                      { fontSize: 20, color: "dimgray" },
                    ]}
                  >
                    Nutritive values for 100g
                  </Text>
                </View>
              )}
              <View style={{ paddingLeft: "3%", gap: 8 }}>
                {productInfo.macroNutrient.energyKcal && (
                  <Text style={styles.textInformation}>
                    Energy kcal:
                    <Text style={styles.textInformationValue}>
                      {space + productInfo.macroNutrient.energyKcal.toString()}
                    </Text>
                  </Text>
                )}
                {productInfo.macroNutrient.energyKJ && (
                  <Text style={styles.textInformation}>
                    Energy KJ:
                    <Text style={styles.textInformationValue}>
                      {space + productInfo.macroNutrient.energyKJ.toString()}
                    </Text>
                  </Text>
                )}
                {productInfo.macroNutrient.carbohydrates && (
                  <Text style={styles.textInformation}>
                    carbohydrates:
                    <Text style={styles.textInformationValue}>
                      {space +
                        productInfo.macroNutrient.carbohydrates.toString() +
                        space}
                      {productInfo.weightType}
                    </Text>
                  </Text>
                )}
                {productInfo.macroNutrient.saturatedFats && (
                  <Text style={styles.textInformation}>
                    Saturated fats:
                    <Text style={styles.textInformationValue}>
                      {space +
                        productInfo.macroNutrient.saturatedFats.toString() +
                        space}
                      {productInfo.weightType}
                    </Text>
                  </Text>
                )}
                {productInfo.macroNutrient.proteins && (
                  <Text style={styles.textInformation}>
                    proteins:
                    <Text style={styles.textInformationValue}>
                      {space +
                        productInfo.macroNutrient.proteins.toString() +
                        space}
                      {productInfo.weightType}
                    </Text>
                  </Text>
                )}
                {productInfo.macroNutrient.fat && (
                  <Text style={styles.textInformation}>
                    fats:
                    <Text style={styles.textInformationValue}>
                      {space + productInfo.macroNutrient.fat.toString() + space}
                      {productInfo.weightType}
                    </Text>
                  </Text>
                )}
                {productInfo.macroNutrient.salt && (
                  <Text style={styles.textInformation}>
                    salt:
                    <Text style={styles.textInformationValue}>
                      {space +
                        productInfo.macroNutrient.salt.toString() +
                        space}
                      {productInfo.weightType}
                    </Text>
                  </Text>
                )}

                {productInfo.macroNutrient.sugars && (
                  <Text style={styles.textInformation}>
                    sugars:
                    <Text style={styles.textInformationValue}>
                      {space +
                        productInfo.macroNutrient.sugars.toString() +
                        space}
                      {productInfo.weightType}
                    </Text>
                  </Text>
                )}
                {productInfo.microNutrient.vitamins && (
                  <Text style={styles.textInformation}>
                    Vitamins:
                    <Text style={styles.textInformationValue}>
                      {space +
                        productInfo.microNutrient.vitamins.toString() +
                        space}
                      {productInfo.weightType}
                    </Text>
                  </Text>
                )}
                {productInfo.microNutrient.minerals && (
                  <Text style={styles.textInformation}>
                    Minerals:
                    <Text style={styles.textInformationValue}>
                      {space +
                        productInfo.microNutrient.minerals.toString() +
                        space}
                      {productInfo.weightType}
                    </Text>
                  </Text>
                )}
              </View>
              <TextInput
                style={styles.input}
                placeholder="grams to add"
                placeholderTextColor={"#9c9c9c"}
                value={grams}
                onChangeText={(value) => setGrams(value)}
              />
              <Button title="Add to list" onPress={handleAddToList} />
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
  textInformation: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textInformationValue: {
    fontSize: 15,
    fontWeight: "300",
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
