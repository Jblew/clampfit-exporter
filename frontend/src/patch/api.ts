import { getFromApi, postToApi } from "api";
import { PatchSample, LevelsTableRow } from "appdomain";

export async function fetchData() {
  return {
    samples: await fetchSamples(),
    levelsTables: await fetchLevelsTables({ days: 30 }),
  };
}

async function fetchSamples(): Promise<PatchSample[]> {
  const resp: { samples: PatchSample[] } = await getFromApi("/samples");
  if (!resp.samples) {
    throw new Error("Malformed response, samples field missing");
  }
  return resp.samples;
}

async function fetchLevelsTables({ days }: { days?: number } = {}): Promise<
  LevelsTableRow[]
> {
  const resp: { levelsTables: LevelsTableRow[] } = await getFromApi(
    `/levels_tables?days=${days ? days : 30}`
  );
  if (!resp.levelsTables) {
    throw new Error("Malformed response, levelsTables field missing");
  }
  return resp.levelsTables;
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

export async function fetchDisplayFields(): Promise<string[]> {
  const resp: { patchTableFields: string[] } = await getFromApi(
    `/display_preferences/patch_table_fields`
  );
  if (!resp.patchTableFields) {
    throw new Error("Malformed response, field 'patchTableFields' is missing");
  }
  return resp.patchTableFields;
}

export async function saveDisplayFields(
  patchTableFields: string[]
): Promise<string[]> {
  const resp: { patchTableFields: string[] } = await postToApi(
    `/display_preferences/patch_table_fields`,
    { patchTableFields }
  );
  if (!resp.patchTableFields) {
    throw new Error("Malformed response, field 'patchTableFields' is missing");
  }
  return resp.patchTableFields;
}
