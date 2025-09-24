import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
  const { location, isLoading } = useGetUserLocation();

  const handleLocationError = (error: string) => {
    Alert.alert('Ошибка геолокации', error, [{ text: 'OK' }]);
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Доступные смены',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        {isLoading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <LocationRequestButton onError={handleLocationError} />
        )}
      </View>
      {location && <ShiftsSearchList location={location} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderText: {
    fontSize: 16,
    color: '#6C757D',
    marginTop: 16,
    textAlign: 'center',
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 20,
  },
});
