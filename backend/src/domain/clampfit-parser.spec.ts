import {} from "mocha";
import { expect } from "chai";
import { parseClampfitSummary } from "./clamfit-parser";

describe("parseClampfitSummary", () => {
  const samples = getRawSamples();
  samples.map(([sample, correct], i) =>
    describe(`Sample #${i}`, () => {
      it("gets category", () => {
        expect(parseClampfitSummary(sample).category).to.be.equal(
          correct.category
        );
      });

      it("gets trace number", () => {
        expect(parseClampfitSummary(sample).traceNumber).to.be.equal(
          correct.traceNumber
        );
      });

      it("gets search number", () => {
        expect(parseClampfitSummary(sample).searchNumber).to.be.equal(
          correct.searchNumber
        );
      });

      it("gets amplitude mean", () => {
        expect(parseClampfitSummary(sample).amplitudeMeanPa).to.be.equal(
          correct.amplitudeMeanPa
        );
      });

      it("gets amplitude sd", () => {
        expect(parseClampfitSummary(sample).amplitudeSDPa).to.be.equal(
          correct.amplitudeSDPa
        );
      });

      it("gets Half-width mean", () => {
        expect(parseClampfitSummary(sample).halfWidthMeanMs).to.be.equal(
          correct.halfWidthMeanMs
        );
      });

      it("gets Half-width sd", () => {
        expect(parseClampfitSummary(sample).halfWidthSDMs).to.be.equal(
          correct.halfWidthSDMs
        );
      });

      it("gets Half-width count", () => {
        expect(parseClampfitSummary(sample).halfWidthCount).to.be.equal(
          correct.halfWidthCount
        );
      });

      it("gets Instantaneous frequency mean", () => {
        expect(
          parseClampfitSummary(sample).instantanoeusFrequencyMeanHz
        ).to.be.equal(correct.instantanoeusFrequencyMeanHz);
      });

      it("gets Instantaneous frequency sd", () => {
        expect(
          parseClampfitSummary(sample).instantanoeusFrequencySDHz
        ).to.be.equal(correct.instantanoeusFrequencySDHz);
      });

      it("gets Instantaneous frequency count", () => {
        expect(
          parseClampfitSummary(sample).instantanoeusFrequencyCount
        ).to.be.equal(correct.instantanoeusFrequencyCount);
      });

      it("gets Interevent interval mean", () => {
        expect(
          parseClampfitSummary(sample).intereventIntervalMeanMs
        ).to.be.equal(correct.intereventIntervalMeanMs);
      });

      it("gets Interevent interval sd", () => {
        expect(parseClampfitSummary(sample).intereventIntervalSDMs).to.be.equal(
          correct.intereventIntervalSDMs
        );
      });

      it("gets Interevent interval count", () => {
        expect(
          parseClampfitSummary(sample).intereventIntervalCount
        ).to.be.equal(correct.intereventIntervalCount);
      });

      it("gets P(open) for specified level", () => {
        expect(parseClampfitSummary(sample).pOpenForSpecifiedLevel).to.be.equal(
          correct.pOpenForSpecifiedLevel
        );
      });

      it("gets NP(open) for all levels", () => {
        expect(parseClampfitSummary(sample).npOpenForAllLevels).to.be.equal(
          correct.npOpenForAllLevels
        );
      });
    })
  );
});

function getRawSamples() {
  const s1 = `
EVENT STATISTICS for 
Category 2.
Trace Number 1
Search Number 1
  Event Property                Mean ± Standard Deviation              Count
------------------            -----------------------------          ---------
Amplitude (%s)                =  8.87292 ± 1.22061 pA                ( n = 3685 )
Half-width                    =  1.14976 ± 1.29737 ms                ( n = 3685 )
Instantaneous frequency       =  540.08300 ± 595.87100 Hz            ( n = 3684 )
Interevent interval           =  16.27761 ± 29.89936 ms              ( n = 3684 )
                                                                     (  )
P(open) for specified level   =  0.0706262                           ( N/A )
NP(open) for all levels       =  0.291961                            ( N/A )
-------------------------------------------------------------------------------
  `;
  const correct1 = {
    category: 2,
    traceNumber: 1,
    searchNumber: 1,
    amplitudeMeanPa: "8.87292",
    amplitudeSDPa: "1.22061",
    amplitudeSampleCount: "3685",
    halfWidthMeanMs: "1.14976",
    halfWidthSDMs: "1.29737",
    halfWidthCount: "3685",
    instantanoeusFrequencyMeanHz: "540.08300",
    instantanoeusFrequencySDHz: "595.87100",
    instantanoeusFrequencyCount: "3684",
    intereventIntervalMeanMs: "16.27761",
    intereventIntervalSDMs: "29.89936",
    intereventIntervalCount: "3684",
    pOpenForSpecifiedLevel: "0.0706262",
    npOpenForAllLevels: "0.291961",
  };
  const s2 = `
EVENT STATISTICS for 
Category 3.
Trace Number 1
Search Number 1
  Event Property                Mean ± Standard Deviation              Count
------------------            -----------------------------          ---------
Amplitude (%s)                =  -5.22739 ± 0.37690 pA               ( n = 14262 )
Half-width                    =  3.65545 ± 9.28519 ms                ( n = 14262 )
Instantaneous frequency       =  745.53200 ± 593.07100 Hz            ( n = 14261 )
Interevent interval           =  4.20578 ± 9.26414 ms                ( n = 14261 )
                                                                     (  )
P(open) for specified level   =  0.869177                            ( N/A )
NP(open) for all levels       =  2.85924                             ( N/A )
-------------------------------------------------------------------------------
  `;
  const correct2 = {
    category: 3,
    traceNumber: 1,
    searchNumber: 1,
    amplitudeMeanPa: "-5.22739",
    amplitudeSDPa: "0.37690",
    amplitudeSampleCount: "14262",
    halfWidthMeanMs: "3.65545",
    halfWidthSDMs: "9.28519",
    halfWidthCount: "14262",
    instantanoeusFrequencyMeanHz: "745.53200",
    instantanoeusFrequencySDHz: "593.07100",
    instantanoeusFrequencyCount: "14261",
    intereventIntervalMeanMs: "4.20578",
    intereventIntervalSDMs: "9.26414",
    intereventIntervalCount: "14261",
    pOpenForSpecifiedLevel: "0.869177",
    npOpenForAllLevels: "2.85924",
  };
  return [[s1, correct1] as const, [s2, correct2] as const];
}
