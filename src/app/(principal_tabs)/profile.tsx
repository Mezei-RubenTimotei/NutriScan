import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Spacing from "../components/Spacing";

const profile = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { authState, onLogin, onLogout } = useAuth();

  const login = async () => {
    const result = await onLogin!(userName, password);
    setUserName("");
    setPassword("");
    if (!result && result.error) {
      alert(result.msg);
    } else alert("you have been logged in");
  };

  const logout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      alert(result.msg);
    } else alert("You have been logged out");
  };

  return (
    <View style={styles.container}>
      {authState.authenticated ? <Text> Wellcome </Text> : null}
      <Spacing space={80} />
      <Image
        source={require("./../../assets/profile.png")}
        style={styles.profileIcon}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={(val) => setUserName(val)}
        />
      </View>
      <View>
        <Text style={styles.text}>password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <Button title="log out" onPress={logout} />
      {authState.authenticated ? null : (
        <Button title="log in" onPress={login} />
      )}
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    width: 140,
    lineHeight: 20,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  profileIcon: {
    width: 200,
    height: 200,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
  },
});
