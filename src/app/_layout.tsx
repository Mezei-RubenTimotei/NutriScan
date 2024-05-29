import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const StackLayout = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
};

export default StackLayout;
