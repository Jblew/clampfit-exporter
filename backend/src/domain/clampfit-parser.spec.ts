import { expect } from "chai";
import { parseClampfitSummary } from "./clamfit-parser";

describe("parseClampfitSummary", () => {
  it("gets category", () => {
    expect(parseClampfitSummary(getRawSample()).category).to.be.equal(2);
  });

  it("gets trace number", () => {
    expect(parseClampfitSummary(getRawSample()).traceNumber).to.be.equal(1);
  });

  it("gets search number", () => {
    expect(parseClampfitSummary(getRawSample()).searchNumber).to.be.equal(1);
  });

  it("gets amplitude mean", () => {
    expect(parseClampfitSummary(getRawSample()).amplitudeMeanPa).to.be.equal(
      "8.87292"
    );
  });

  it("gets amplitude sd", () => {
    expect(parseClampfitSummary(getRawSample()).amplitudeSDPa).to.be.equal(
      "1.22061"
    );
  });

  it("gets Half-width mean", () => {
    expect(parseClampfitSummary(getRawSample()).halfWidthMeanMs).to.be.equal(
      "1.14976"
    );
  });

  it("gets Half-width sd", () => {
    expect(parseClampfitSummary(getRawSample()).halfWidthSDMs).to.be.equal(
      "1.29737"
    );
  });

  it("gets Half-width count", () => {
    expect(parseClampfitSummary(getRawSample()).halfWitdthCount).to.be.equal(
      "3685"
    );
  });

  it("gets Instantaneous frequency mean", () => {
    expect(
      parseClampfitSummary(getRawSample()).instantanoeusFrequencyMeanHz
    ).to.be.equal("540.08300");
  });

  it("gets Instantaneous frequency sd", () => {
    expect(
      parseClampfitSummary(getRawSample()).instantanoeusFrequencySDHz
    ).to.be.equal("595.87100");
  });

  it("gets Instantaneous frequency count", () => {
    expect(
      parseClampfitSummary(getRawSample()).instantanoeusFrequencyCount
    ).to.be.equal("3684");
  });

  it("gets Interevent interval mean", () => {
    expect(
      parseClampfitSummary(getRawSample()).intereventIntervalMeanMs
    ).to.be.equal("16.27761");
  });

  it("gets Interevent interval sd", () => {
    expect(
      parseClampfitSummary(getRawSample()).intereventIntervalSDMs
    ).to.be.equal("29.89936");
  });

  it("gets Interevent interval count", () => {
    expect(
      parseClampfitSummary(getRawSample()).intereventIntervalCount
    ).to.be.equal("3684");
  });

  it("gets P(open) for specified level", () => {
    expect(
      parseClampfitSummary(getRawSample()).pOpenForSpecifiedLevel
    ).to.be.equal("0.0706262");
  });

  it("gets NP(open) for all levels", () => {
    expect(parseClampfitSummary(getRawSample()).npOpenForAllLevels).to.be.equal(
      "0.291961"
    );
  });
});

function getRawSample() {
  return `
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
}
