import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation, {
  AuthorizationResult,
} from 'react-native-geolocation-service';
import { Location } from '@/shared/types';
import { LocationQueryData } from '../model/types';

const requestLocationPermission = async (): Promise<AuthorizationResult> => {
  try {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');
      return status;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Доступ к геолокации',
          message:
            'Приложению нужен доступ к вашему местоположению для поиска смен рядом с вами.',
          buttonNeutral: 'Спросить позже',
          buttonNegative: 'Отмена',
          buttonPositive: 'Разрешить',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return 'granted';
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        return 'restricted';
      } else {
        return 'denied';
      }
    }
  } catch (error) {
    return 'denied';
  }
};

export const getCurrentPosition = async (): Promise<LocationQueryData> => {
  const permissionStatus = await requestLocationPermission();

  if (permissionStatus !== 'granted') {
    return {
      location: undefined,
      hasPermission: false,
      permissionStatus,
      lastUpdated: Date.now(),
    };
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve({
          location,
          hasPermission: true,
          permissionStatus: 'granted',
          lastUpdated: Date.now(),
        });
      },
      error => {
        reject({
          location: undefined,
          hasPermission: true,
          permissionStatus: 'granted',
          lastUpdated: Date.now(),
          error: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};
