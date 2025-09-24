import { useGetUserLocation } from '@/entities/location/model/hooks/useGetUserLocation';
import { LocationButtonAction } from '@/entities/location/model/types';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LocationRequestButtonProps {
  onError?: (error: string) => void;
}

const getButtonText = (locationButtonAction: LocationButtonAction) => {
  switch (locationButtonAction) {
    case 'retry':
      return 'Повторить попытку';
    case 'request':
    default:
      return 'Определить местоположение';
  }
};

export const LocationRequestButton: React.FC<LocationRequestButtonProps> = ({
  onError,
}) => {
  const {
    isLoading,
    error,
    shouldShowLocationButton,
    locationButtonAction,
    refreshLocation,
  } = useGetUserLocation();

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const getButtonStyle = () => {
    if (isLoading) return [styles.button, styles.buttonLoading];
    if (error) return [styles.button, styles.buttonError];
    return styles.button;
  };

  const handlePress = () => {
    refreshLocation();
  };

  if (!shouldShowLocationButton) {
    return null;
  }

  return (
    <View style={styles.container}>
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
  container: {
    padding: 16,
    alignItems: 'center',
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
