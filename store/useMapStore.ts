import { create } from "zustand";

export const useMapStore = create((set) => ({
  globalTripData: null,
  //   isLoggedIn: false,

  setGlobalTripData: (tripdata: any) =>
    set({
      globalTripData: tripdata,
    }),

  //   logout: () =>
  //     set({
  //       user: null,
  //       isLoggedIn: false,
  //     }),
}));
