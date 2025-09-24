export type RootStackParamList = {
  ShiftsList: undefined;
  ShiftDetails: {
    id: string;
  };
};


export interface Location {
  latitude: number;
  longitude: number;
}


export type WorkType = {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}

export type Shift = {
  id: string;
  logo: string;
  coordinates: Location;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: WorkType[];
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number | null;
  isPromotionEnabled: boolean;
}
