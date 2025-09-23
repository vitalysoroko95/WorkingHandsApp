import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/shared/types';
import { LocationRequestButton } from '@/features/location-request-button/ui/LocationRequestButton';
import { useGetUserLocation } from '@/entities/location/model/hooks/useGetUserLocation';

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
  const { location, shouldShowLocationButton, loading } = useGetUserLocation();

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
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loaderText}>Определение местоположения...</Text>
        </View>
      ) : shouldShowLocationButton ? (
        <View style={styles.locationContainer}>
          <LocationRequestButton onError={handleLocationError} />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {location && (
            <Text style={styles.statusText}>
              Местоположение определено: {location.latitude.toFixed(4)},{' '}
              {location.longitude.toFixed(4)}
            </Text>
          )}
        </View>
      )}
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
