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
