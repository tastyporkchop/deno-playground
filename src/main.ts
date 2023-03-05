import { isLeft, PathReporter, t } from "./deps.ts";
import { Data, DataT } from "./data.ts";

export function main(): void {
  // some input data
  const data = {
    a: 1,
    b: "once there was a king",
    c: [1, 2, 3],
  };
  // decode it
  const decodedData = handle(JSON.stringify(data));

  console.log(Data.encode(decodedData));
}

export function handle(rawData: string): DataT {
  const data = JSON.parse(rawData);
  const decoded = Data.decode(data); // Either<Errors, Data>
  if (isLeft(decoded)) {
    throw Error(
      `Could not validate data: ${PathReporter.report(decoded).join("\n")}`,
    );
  }
  // get the runtime type and cast right to it
  return decoded.right;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
