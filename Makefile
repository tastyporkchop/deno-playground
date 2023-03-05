test:
	deno fmt
	deno test --cached-only --check ./tests/

build:
	deno fmt
	deno cache ./src/deps.ts
	deno test --cached-only --check ./tests/

bench:
	deno bench --cached-only ./benches/