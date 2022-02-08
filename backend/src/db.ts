import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { PatchSample } from "./entity/PatchSample";

export async function initDatabase() {
  await createConnection();

  async function testDatabase() {
    try {
      const noSamples = await getRepository(PatchSample).count();
      console.log(`[test-database] Database contains ${noSamples} samples`);
    } catch (err) {
      console.error("[test-database] Test failed: ", err);
    }
  }

  await testDatabase();
}
