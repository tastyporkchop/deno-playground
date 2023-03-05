import { add } from "./main.ts";

Deno.bench(function addSmall(): void {
  add(1, 2);
});

Deno.bench(function addBig(): void {
  add(2 ** 32, 2 ** 32);
});
