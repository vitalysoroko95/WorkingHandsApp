import { Location } from '../../../shared/types';

export interface LocationQueryData {
  location: Location | null;
  hasPermission: boolean;
  permissionStatus: 'granted' | 'denied' | 'restricted' | 'unknown';
  lastUpdated: number;
}

export interface GeolocationPermissionStatus {
  granted: boolean;
  denied: boolean;
  restricted: boolean;
  requestInProgress: boolean;
}
