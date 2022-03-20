import { getConnection, getManager, getRepository } from "typeorm";
import { parseClampfitSummary } from "./domain";
import { DisplayPreferences } from "./entity/DisplayPreferences";
import { PatchSample } from "./entity/PatchSample";

export async function getSamples({ email }: { email: string }) {
  return await getRepository(PatchSample).find({
    where: { email: email },
    order: { date: "DESC" },
  });
}

export async function saveClampfitSummaryAsPatchSample({
  clampfitSummary,
  name,
  email,
}: {
  clampfitSummary: string;
  name: string;
  email: string;
}) {
  const clampfitSample = parseClampfitSummary(clampfitSummary);
  clampfitSample.name = name;
  clampfitSample.email = email;
  await getRepository(PatchSample).save(clampfitSample);
}

export async function deleteSample({
  ID,
  email,
}: {
  ID: string;
  email: string;
}) {
  if (!ID) throw new TypeError("ID must be specified when deleting sample");
  if (!email)
    throw new TypeError("Email must be specified when deleting sample");
  await getRepository(PatchSample).softDelete({ ID, email });
}

export async function getEmailCount() {
  const outRows = await getManager().query(
    `
    WITH agg AS (
      SELECT distinct email
      FROM ${getConnection().getMetadata(PatchSample).tableName}
      GROUP BY email
      )
    SELECT COUNT (*) as emails_count
    FROM agg
    `
  );
  const count = outRows?.[0]?.emails_count;
  if (!count) {
    throw new Error("Database didn't return emails count");
  }
  return parseInt(count);
}

export async function getPatchTableFields({
  email,
}: {
  email: string;
}): Promise<string[]> {
  const displayPreferences = await getRepository(DisplayPreferences).findOne({
    where: { email: email },
  });
  if (!displayPreferences) return [];
  return displayPreferences?.patchTableFields;
}

export async function savePatchTableFields({
  email,
  patchTableFields,
}: {
  email: string;
  patchTableFields: string[];
}): Promise<string[]> {
  const displayPreferences = await getRepository(DisplayPreferences).save({
    // "Also supports partial updating since all undefined properties are skipped" — https://typeorm.io/#/repository-api
    email: email,
    patchTableFields,
  });
  if (!displayPreferences) return [];
  return displayPreferences?.patchTableFields;
}

export async function getLevelsTables({
  email,
  days,
}: {
  email: string;
  days: number;
}) {
  const groups = await getManager().query(
    `
    SELECT "npOpenForAllLevels", max(date) as maxdate, min(date) as mindate, COUNT(*) as count
    FROM ${getConnection().getMetadata(PatchSample).tableName}
    WHERE email = $1 AND date > current_date - interval '${days}' day
    GROUP BY "npOpenForAllLevels"
    ORDER BY maxdate DESC;
`,
    [email]
  );
  const tables = await Promise.all(
    groups.map(async (group: any) => ({
      ...(await getLevelsTableForSampleIdentifiedByNpOpen({
        email,
        npOpenForAllLevels: group.npOpenForAllLevels,
      })),
      minDate: group.mindate,
      maxDate: group.maxdate,
      count: group.count,
    }))
  );

  return tables;
}

async function getLevelsTableForSampleIdentifiedByNpOpen({
  email,
  npOpenForAllLevels,
}: {
  email: string;
  npOpenForAllLevels: string;
}) {
  const rows = await getRepository(PatchSample).find({
    where: { email: email, npOpenForAllLevels },
    order: { category: "ASC" },
  });
  const out: Record<string, any> = {};
  for (const row of rows) {
    out[`currentMean_${row.category}`] = row.amplitudeMeanPa;
    out[`pOpenForSpecifiedLevel_${row.category}`] = row.pOpenForSpecifiedLevel;
    out["npOpenForAllLevels"] = row.npOpenForAllLevels;
  }
  out.levels = removeDuplicates(rows.map((row) => row.category));
  return out;
}

function removeDuplicates<T>(arr: T[]): T[] {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}
