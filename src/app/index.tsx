import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './navigation/AppNavigator';
import { queryClient } from '../shared/config';
import { QueryClientProvider } from '@tanstack/react-query';

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
