import { useQuery } from '@tanstack/react-query';
import { Location } from '@/shared/types';

import { locationGettingsOptions } from '../location';
import { GeolocationPermissionStatus } from '../types';
import { showLocationSettingsAlert } from '../../lib/show-location-settings-alert';



export const useGetUserLocation = () => {
  const { data, isLoading, error, refetch } = useQuery({
    ...locationGettingsOptions,
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const shouldShowLocationButton = 
    data?.permissionStatus === 'denied' || 
    data?.permissionStatus === 'restricted' ||
    (!!error && !isLoading);

  const permissionStatus: GeolocationPermissionStatus = {
    granted: data?.permissionStatus === 'granted' || false,
    denied: data?.permissionStatus === 'denied' || false,
    restricted: data?.permissionStatus === 'restricted' || false,
    requestInProgress: isLoading,
  };

  const getCurrentLocation = async (): Promise<Location | null> => {
    const result = await refetch();
    return result.data?.location || null;
  };

  return {
    location: data?.location || null,
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Ошибка получения геолокации') : null,
    permissionStatus,
    shouldShowLocationButton,
    getCurrentLocation,
    refreshLocation: () => refetch(),
    showLocationSettingsAlert,
  };
};
