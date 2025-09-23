import { PermissionStatus } from "react-native";
import { Location } from "../../shared/types";
import { AuthorizationResult } from "react-native-geolocation-service";


export type  GeolocationPermissionStatus = {
  granted: boolean;
  denied: boolean;
  restricted: boolean;
  requestInProgress: boolean;
}


export type  LocationQueryData = {
  location: Location | null;
  hasPermission: boolean;
  permissionStatus: PermissionStatus | AuthorizationResult;
  lastUpdated: number;
}



