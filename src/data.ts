import { isLeft, PathReporter, t } from "./deps.ts";
// see: https://github.com/gcanti/t-ts/blob/master/index.md
// A data definition
// Required fields
const DataReq = t.type({
  a: t.number,
  b: t.string,
});
// Optional fields
const DataOpt = t.partial({
  c: t.array(t.number),
});
// Intersect the two to create a mix of required and optional fields
const Data = t.intersection([DataReq, DataOpt]);
type Data = t.TypeOf<typeof Data>;

type DataT = t.TypeOf<typeof Data>;
export { Data };
export type { DataT };
