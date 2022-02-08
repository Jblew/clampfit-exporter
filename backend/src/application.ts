import { getRepository } from "typeorm";
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
