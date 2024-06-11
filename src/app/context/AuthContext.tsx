import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string | null, password: string) => Promise<any>;
  onLogin?: (email: string | null, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL =
  "http://nutriscore-api-test-env-3.eu-central-1.elasticbeanstalk.com";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored: ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (user: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        user,
        password,
      });

      setAuthState({
        token: result.data.authKey,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.authKey}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.authKey);

      return result;
    } catch (e) {
      return { error: true, msg: "invalid credentials" };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      axios.defaults.headers.common["Authorization"] = "";

      setAuthState({
        token: null,
        authenticated: false,
      });
    } catch (e) {
      return { error: true, msg: "logout erorr" };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
