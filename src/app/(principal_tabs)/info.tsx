import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera/legacy";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { Points } from "@shopify/react-native-skia";

const info = () => {
  const [search, setSearch] = useState("");
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [barcode, setBarcode] = useState("");

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
          size={30}
          color="red"
          style={styles.escapeBtn}
        />
      </View>
    );
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
          size={32}
          color="dimgray"
        />
      </View>
      {search != "" && (
        <Button
          title="Search"
          onPress={() => setSearch("")}
          color={"royalblue"}
        />
      )}
      {barcode != "" && <Text>Your barcode is {barcode}</Text>}
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
});
