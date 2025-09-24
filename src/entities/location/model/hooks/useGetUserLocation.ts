import { useEffect, useState } from 'react';
import { Location } from '@/shared/types';

import { LocationQueryData, LocationButtonAction } from '../types';
import { getCurrentPosition } from '../../lib/get-current-position';

export const useGetUserLocation = () => {
  const [locationData, setLocationData] = useState<LocationQueryData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getCurrentPosition();
      setLocationData(result);
    } catch {
      setError('Ошибка получения геолокации');
      setLocationData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const shouldShowLocationButton = !locationData?.location && error;

  const getCurrentLocation = async (): Promise<Location | undefined> => {
    await fetchLocation();
    return locationData?.location || undefined;
  };

  const getLocationButtonAction = (): LocationButtonAction => {
    if (!locationData?.hasPermission) return 'request';
    return 'retry';
  };

  return {
    location: locationData?.location || undefined,
    error,
    permissionStatus: locationData?.permissionStatus,
    hasPermission: locationData?.hasPermission || false,
    isLoading,
    shouldShowLocationButton,
    locationButtonAction: getLocationButtonAction(),
    getCurrentLocation,
    refreshLocation: fetchLocation,
  };
};
