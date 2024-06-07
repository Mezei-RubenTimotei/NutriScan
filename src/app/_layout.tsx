import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";

const StackLayout = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default StackLayout;
