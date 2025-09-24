import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/shared/types';
import { LocationRequestButton } from '@/features/location-request-button/ui/LocationRequestButton';
import { useGetUserLocation } from '@/entities/location/model/hooks/useGetUserLocation';
import { ShiftsSearchList } from '@/features/shift-search/ui/shifts-search-list';

type ShiftsListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ShiftsList'
>;

interface ShiftsListPageProps {
  navigation: ShiftsListNavigationProp;
}

export const ShiftsListScreen: React.FC<ShiftsListPageProps> = ({
  navigation,
}) => {
  const { location } = useGetUserLocation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Доступные смены',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LocationRequestButton />
      {location && <ShiftsSearchList location={location} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
