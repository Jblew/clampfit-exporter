import { getConnection, getManager, getRepository } from "typeorm";
import { parseClampfitSummary } from "./domain";
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

export async function getLevelsTables({ email }: { email: string }) {
  const groups = await getManager().query(
    `
    SELECT "npOpenForAllLevels", max(date) as maxDate, min(date) as minDate
    FROM ${getConnection().getMetadata(PatchSample).tableName}
    WHERE email = $1
    GROUP BY "npOpenForAllLevels"
    ORDER BY maxDate DESC;
`,
    [email]
  );

  const tables = await Promise.all(
    groups.map(async (group: any) => ({
      ...(await getLevelsTableForSampleIdentifiedByNpOpen({
        email,
        npOpenForAllLevels: group.npOpenForAllLevels,
      })),
      minDate: group.minDate,
      maxDate: group.maxDate,
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
    order: { category: "DESC" },
  });
  const out: Record<string, any> = {};
  for (const row of rows) {
    out[`currentMean_${row.category}`] = row.amplitudeMeanPa;
    out[`pOpenForSpecifiedLevel_${row.category}`] = row.pOpenForSpecifiedLevel;
    out["npOpenForAllLevels"] = row.npOpenForAllLevels;
  }
  return out;
}
