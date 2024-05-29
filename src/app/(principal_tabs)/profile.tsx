import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { sendLogin } from "../api/auth";

const profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const client = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: () => addToWatchList(id),
  //   onSuccess: () => {
  //     client.invalidateQueries({ queryKey: ["watchList"] });
  //   },
  // });

  const hadnleLogin = () => {
    // const { data: LoginData, isLoading } = useQuery({
    //   queryKey: ["token"],
    //   queryFn: () => {
    //     sendLogin(name, password);
    //   },
    // });
    console.log("you clicked");
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <View>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(val) => setName(val)}
        />
      </View>
      <View>
        <Text>password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <Button title="log in" onPress={() => hadnleLogin} />
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
});
