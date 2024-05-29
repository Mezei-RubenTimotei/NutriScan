import { apiUrl, TOKEN_LOGIN } from "../config/constants";
import * as SecureStore from "expo-secure-store";

export const sendLogin = async (name: string, password: string) => {
  const url = `${apiUrl}/auth/login`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user: name,
      password: password,
    }),
  };

  const res = await fetch(url, options);

  if (!res.ok) throw new Error("Failed to fetch movies");

  const json = await res.json();

  await SecureStore.setItemAsync(TOKEN_LOGIN, "to_be_replaced");
  // const token = await SecureStore.getItemAsync("secure_token");
  // console.log(token);
  return json;
};
