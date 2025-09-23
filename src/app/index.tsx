import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { AppNavigator } from './navigation/AppNavigator';
import { persister, queryClient } from '../shared/config';

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
        }}
      >
        <AppNavigator />
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
};
