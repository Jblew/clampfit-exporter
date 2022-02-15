import { PatchSample } from "./clamp";

/*
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
*/
export function parseClampfitSummary(summary: string): PatchSample {
  const lines = summary.split("\n").map((s) => s.trim().toLowerCase());
  return {
    category: parseInt(matchLine(lines, /^category\s+([\-0-9]+).*$/gi) || "-1"),
    traceNumber: parseInt(
      matchLine(lines, /^trace\snumber\s+([\-0-9]+).*$/gi) || "-1"
    ),
    searchNumber: parseInt(
      matchLine(lines, /^search\snumber\s+([\-0-9]+).*$/gi) || "-1"
    ),
    amplitudeMeanPa: getTabularizedMean(lines, "amplitude"),
    amplitudeSDPa: getTabularizedSD(lines, "amplitude"),
    amplitudeSampleCount: getTabularizedCount(lines, "amplitude"),
    halfWidthMeanMs: getTabularizedMean(lines, "half-width"),
    halfWidthSDMs: getTabularizedSD(lines, "half-width"),
    halfWidthCount: getTabularizedCount(lines, "half-width"),
    instantanoeusFrequencyMeanHz: getTabularizedMean(
      lines,
      "instantaneous\\sfrequency"
    ),
    instantanoeusFrequencySDHz: getTabularizedSD(
      lines,
      "instantaneous\\sfrequency"
    ),
    instantanoeusFrequencyCount: getTabularizedCount(
      lines,
      "instantaneous\\sfrequency"
    ),
    intereventIntervalMeanMs: getTabularizedMean(
      lines,
      "interevent\\sinterval"
    ),
    intereventIntervalSDMs: getTabularizedSD(lines, "interevent\\sinterval"),
    intereventIntervalCount: getTabularizedCount(
      lines,
      "interevent\\sinterval"
    ),
    pOpenForSpecifiedLevel: matchLine(
      lines,
      /^p\(open\)\sfor\sspecified\slevel[^=]+=\s+([\-0-9\.]+).*$/gi
    ),
    npOpenForAllLevels: matchLine(
      lines,
      /^np\(open\)\sfor\sall\slevel[^=]+=\s+([\-0-9\.]+).*$/gi
    ),
  } as PatchSample;
}

function getTabularizedMean(lines: string[], name: string) {
  return matchLine(lines, RegExp(`^${name}[^=]+=\\s+([\\-0-9\\.]+).*$`, "gi"));
}

function getTabularizedSD(lines: string[], name: string) {
  return matchLine(lines, RegExp(`^${name}[^±]+±\\s+([\\-0-9\\.]+).*$`, "gi"));
}

function getTabularizedCount(lines: string[], name: string) {
  return matchLine(
    lines,
    RegExp(`^${name}[^±]+±[^=]+=\\s?([\\-0-9\\.]+).*$`, "gi")
  );
}

function matchLine(lines: string[], re: RegExp): string | undefined {
  for (const line of lines) {
    const matches = Array.from(line.matchAll(re));
    if (matches.length > 0 && matches[0].length > 1) {
      return matches[0][1];
    }
    // console.log(JSON.stringify(matches, undefined, 2));
  }
}
