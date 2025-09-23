import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24 * 7,
    },
  },
});

export const persister = {
  persistClient: async (client: any) => {
    try {
      await AsyncStorage.setItem(
        'REACT_QUERY_OFFLINE_CACHE',
        JSON.stringify(client),
      );
    } catch (error) {
      console.error('Error persisting client:', error);
    }
  },
  restoreClient: async () => {
    try {
      const cached = await AsyncStorage.getItem('REACT_QUERY_OFFLINE_CACHE');
      return cached ? JSON.parse(cached) : undefined;
    } catch (error) {
      console.error('Error restoring client:', error);
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      await AsyncStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');
    } catch (error) {
      console.error('Error removing client:', error);
    }
  },
};
