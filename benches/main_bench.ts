import { handle } from "../src/main.ts";

Deno.bench(function handle_optional(): void {
  handle('{"a": 1, "b":"bb", "c": [1,2,3]}');
});
Deno.bench(function handle_default(): void {
  handle('{"a": 1, "b":"bb"}');
});

Deno.bench(function handle_err(): void {
  try {
    handle('{"a": 1, "b":2}');
  } catch (e: unknown) {
  }
});
