import { getCurrentPosition } from "../lib/get-current-position";


export const LOCATION_QUERY_KEY = ['userLocation'] as const;

export const locationGettingsOptions = {
  queryKey: LOCATION_QUERY_KEY,
  queryFn: getCurrentPosition,
} ;

