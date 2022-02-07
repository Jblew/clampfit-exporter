export interface PatchSample {
  ID: string;
  name?: string;
  email?: string;
  date: Date;
  category: number;
  traceNumber: number;
  searchNumber: number;
  amplitudeMeanPa: StringNumber;
  amplitudeSDPa: StringNumber;
  amplitudeSampleCount: StringNumber;
  halfWidthMeanMs: StringNumber;
  halfWidthSDMs: StringNumber;
  halfWidthCount: StringNumber;
  instantanoeusFrequencyMeanHz: StringNumber;
  instantanoeusFrequencySDHz: StringNumber;
  instantanoeusFrequencyCount: StringNumber;
  intereventIntervalMeanMs: StringNumber;
  intereventIntervalSDMs: StringNumber;
  intereventIntervalCount: StringNumber;
  pOpenForSpecifiedLevel: StringNumber;
  npOpenForAllLevels: StringNumber;
}

type StringNumber = string;
