import { useGetUserLocation } from '@/entities/location/model/hooks/useGetUserLocation';
import { LocationButtonAction } from '@/entities/location/model/types';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const getButtonText = (locationButtonAction: LocationButtonAction) => {
  switch (locationButtonAction) {
    case 'retry':
      return 'Повторить попытку';
    case 'request':
    default:
      return 'Определить местоположение';
  }
};

export const LocationRequestButton: React.FC = () => {
  const {
    isLoading,
    error,
    shouldShowLocationButton,
    locationButtonAction,
    refreshLocation,
  } = useGetUserLocation();

  const getButtonStyle = () => {
    if (error) return [styles.button, styles.buttonError];
    return styles.button;
  };

  const handlePress = () => {
    refreshLocation();
  };

  if (isLoading)
    return (
      <ActivityIndicator
        style={styles.locationContainer}
        color="#0088ffff"
        size="large"
      />
    );

  if (!shouldShowLocationButton) {
    return null;
  }

  return (
    <View style={styles.locationContainer}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={handlePress}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {getButtonText(locationButtonAction)}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingVertical: 10,
  },

  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonLoading: {
    backgroundColor: '#6C757D',
  },
  buttonError: {
    backgroundColor: '#DC3545',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#DC3545',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
