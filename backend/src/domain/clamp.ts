export interface PatchTest {
  date: Date;
  category: number;
  traceNumber: number;
  searchNumber: number;
  amplitudeMeanPa: StringNumber;
  amplitudeSDPa: StringNumber;
  amplitudeSampleCount: StringNumber;
  halfWidthMeanMs: StringNumber;
  halfWidthSDMs: StringNumber;
  halfWitdthCount: StringNumber;
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
