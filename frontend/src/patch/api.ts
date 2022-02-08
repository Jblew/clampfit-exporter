import { getFromApi, postToApi } from "api";
import { PatchSample } from "appdomain";

export async function fetchSamples(): Promise<PatchSample[]> {
  const resp: { samples: PatchSample[] } = await getFromApi("/samples");
  if (!resp.samples) {
    throw new Error("Malformed response, samples field missing");
  }
  return resp.samples;
}

export async function saveClampfitPaste(data: {
  name: string;
  clampfitPaste: string;
}): Promise<PatchSample[]> {
  const resp: { samples: PatchSample[] } = await postToApi("/add_sample", data);
  if (!resp.samples) {
    throw new Error("Malformed response, samples field missing");
  }
  return resp.samples;
}

export async function deleteSample(ID: string): Promise<PatchSample[]> {
  const postData = { ID };
  const resp: { samples: PatchSample[] } = await postToApi(
    "/delete_sample",
    postData
  );
  if (!resp.samples) {
    throw new Error("Malformed response, samples field missing");
  }
  return resp.samples;
}
