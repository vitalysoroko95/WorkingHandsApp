import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ShiftsListScreen } from '../../screens/shifts-list';
import { ShiftDetailsScreen } from '../../screens/shift-details';
import { RootStackParamList } from '../../shared/types';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ShiftsList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen
          name="ShiftsList"
          component={ShiftsListScreen}
          options={{
            title: 'Доступные смены',
          }}
        />
        <Stack.Screen
          name="ShiftDetails"
          component={ShiftDetailsScreen}
          options={{
            title: 'Детали смены',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
