import { Location, Shift } from '@/shared/types';
import response from './response.json';

export async function getShiftsList(
  params: Location | undefined,
): Promise<Shift[]> {
  if (!params) {
    return [];
  }

  return Promise.resolve(response);
}
