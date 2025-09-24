import { Location } from '../../../shared/types';
import { AuthorizationResult } from 'react-native-geolocation-service';

export interface LocationQueryData {
  location: Location | undefined;
  hasPermission: boolean;
  permissionStatus: AuthorizationResult;
  lastUpdated: number;
}

export type LocationButtonAction = 'request' | 'retry';
