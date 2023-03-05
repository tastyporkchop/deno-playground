import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.178.0/testing/asserts.ts";

import { isLeft, PathReporter, t } from "../src/deps.ts";
import { Data } from "../src/data.ts";

interface TestData {
  name: string;
  data: any;
  shouldSucceed: boolean;
}

Deno.test("test data", async (tt) => {
  const tests: TestData[] = [
    {
      name: "required",
      data: { a: 1, b: "b" },
      shouldSucceed: true,
    },
    {
      name: "with optional",
      data: { a: 1, b: "b", c: [] },
      shouldSucceed: true,
    },
    {
      name: "missing a",
      data: { b: "b", c: [] },
      shouldSucceed: false,
    },
    {
      name: "missing b",
      data: { a: 1, c: [] },
      shouldSucceed: false,
    },
    {
      name: "extra",
      data: { a: 1, b: "b", c: [], d: "banana" },
      shouldSucceed: true,
    },
  ];

  for (const test of tests) {
    await tt.step(test.name, async () => {
      const decoded = Data.decode(test.data); // Either<Errors, Data>
      if (isLeft(decoded)) {
        assert(
          !test.shouldSucceed,
          `Could not validate data: ${PathReporter.report(decoded).join("\n")}`,
        );
      } else {
        assert(test.shouldSucceed, "test succeeded when it should have failed");
        // get the runtime type and cast right to it
        type DataT = t.TypeOf<typeof Data>;
        const decodedData: DataT = decoded.right;
      }
    });
  }
});
