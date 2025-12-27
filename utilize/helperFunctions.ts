// Type definitions
export interface City {
  cityId: number;
  name: string;
}

export interface Location {
  bounds: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
  location: { lat: number; lng: number };
  location_type: string;
  viewport: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
}

export interface TripPosition {
  tripTimeWithCityId: number;
  tripId: number;
  cityId: number;
  days: number;
  hours: number;
  mins: number;
  City: City;
  location: Location;
}

export function presentageBetweenPoints(
  pastPosition: TripPosition | null | undefined,
  futurePosition: TripPosition | null | undefined,
  hours: number,
  mins: number
): number {
  if (
    !pastPosition ||
    !futurePosition ||
    typeof pastPosition.hours !== "number" ||
    typeof pastPosition.mins !== "number" ||
    typeof futurePosition.hours !== "number" ||
    typeof futurePosition.mins !== "number" ||
    typeof hours !== "number" ||
    typeof mins !== "number"
  ) {
    console.warn("Invalid input to presentageBetweenPoints:", {
      pastPosition,
      futurePosition,
      hours,
      mins,
    });
    return 0;
  }

  const userTimeInSeconds = timeToSeconds(hours, mins);
  const pastTimeInSeconds = timeToSeconds(
    pastPosition.hours,
    pastPosition.mins
  );
  const futureTimeInSeconds = timeToSeconds(
    futurePosition.hours,
    futurePosition.mins
  );

  if (futureTimeInSeconds === pastTimeInSeconds) {
    return 0;
  }

  const presentage =
    (userTimeInSeconds - pastTimeInSeconds) /
    (futureTimeInSeconds - pastTimeInSeconds);
  return presentage;
}

export function timeToSeconds(hours: number, mins: number) {
  return hours * 3600 + mins * 60;
}
