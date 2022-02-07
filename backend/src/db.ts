import "reflect-metadata";
import { createConnection } from "typeorm";
import { PatchSample } from "./entity/PatchSample";

export async function initDatabase() {
  const connection = await createConnection();

  async function testDatabase() {
    try {
      console.log(
        "[test-database] Inserting a new PatchSample into the database..."
      );
      const ps = new PatchSample();
      ps.amplitudeMeanPa = "0.123456";

      await connection.manager.save(ps);
      console.log("[test-database] Saved a new PatchSample with id: " + ps.ID);

      console.log("[test-database] Loading samples from the database...");
      const samples = await connection.manager.find(PatchSample);
      console.log("[test-database] Loaded samples: ", samples);
    } catch (err) {
      console.error("[test-database] Test failed: ", err);
    }

    setTimeout(() => testDatabase(), 60 * 1000);
  }

  await testDatabase();
}
