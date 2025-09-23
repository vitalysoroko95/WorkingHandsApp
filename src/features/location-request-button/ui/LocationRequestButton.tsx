import { useGetUserLocation } from '@/entities/location/model/hooks/useGetUserLocation';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface LocationRequestButtonProps {
  onError?: (error: string) => void;
}

export const LocationRequestButton: React.FC<LocationRequestButtonProps> = ({
  onError,
}) => {
  const {
    loading,
    error,
    permissionStatus,
    shouldShowLocationButton,
    refreshLocation,
    showLocationSettingsAlert,
  } = useGetUserLocation();

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const getButtonText = () => {
    if (permissionStatus.denied || permissionStatus.restricted) {
      return 'Разрешить доступ к геолокации';
    }
    if (error) {
      return 'Повторить попытку';
    }
    return 'Определить местоположение';
  };

  const getButtonStyle = () => {
    if (loading) return [styles.button, styles.buttonLoading];
    if (error) return [styles.button, styles.buttonError];
    if (permissionStatus.denied || permissionStatus.restricted) {
      return [styles.button, styles.buttonError];
    }
    return styles.button;
  };

  const handlePress = () => {
    if (permissionStatus.denied || permissionStatus.restricted) {
      showLocationSettingsAlert();
    } else {
      refreshLocation();
    }
  };

  if (!shouldShowLocationButton) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={handlePress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text style={styles.buttonText}>{getButtonText()}</Text>
        )}
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
  buttonSuccess: {
    backgroundColor: '#28A745',
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
  locationText: {
    color: '#28A745',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});
