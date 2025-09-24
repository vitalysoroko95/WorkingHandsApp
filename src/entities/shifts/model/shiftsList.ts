import { Location, Shift } from '@/shared/types';
import { UseQueryOptions } from '@tanstack/react-query';
import { shiftsApi } from '@/entities/shifts';

export function getShiftsListKey({ latitude, longitude }: Location) {
  return ['shiftsList', latitude, longitude] as const;
}

export function getShiftsListOptions(
  location: Location,
): UseQueryOptions<
  Shift[],
  Error,
  Shift[],
  ReturnType<typeof getShiftsListKey>
> {
  return {
    queryKey: getShiftsListKey(location),
    queryFn: async ({ queryKey }) => {
      const [, latitude, longitude] = queryKey;
      return shiftsApi.getShiftsList({ latitude, longitude });
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  };
}
