# @ryanatkn/fuz_template ❄

[<img src="/static/logo.svg" alt="a friendly pixelated spider facing you" align="right" width="192" height="192">](https://template.fuz.dev/)

> a static web app and Node library template with
> [TypeScript](https://github.com/microsoft/TypeScript),
> [Svelte](https://github.com/sveltejs/svelte),
> [SvelteKit](https://github.com/sveltejs/kit),
> [Vite](https://github.com/vitejs/vite),
> [esbuild](https://github.com/evanw/esbuild),
> [Fuz](https://github.com/ryanatkn/fuz),
> and [Gro](https://github.com/ryanatkn/gro)

[**template.fuz.dev**](https://template.fuz.dev/)

## contents

- [SvelteKit](https://github.com/sveltejs/kit) with [Svelte](https://github.com/sveltejs/svelte) and
  [Vite](https://github.com/vitejs/vite)
- [Moss](https://github.com/ryanatkn/moss): CSS framework and design system based on style variables
- [Fuz](https://github.com/ryanatkn/fuz):
  - Svelte UI library - [fuz.dev](https://www.fuz.dev/)
  - is optional, to remove, `npm uninstall @ryanatkn/fuz` and delete the imports
- [Gro](https://github.com/ryanatkn/gro):
  - extends [SvelteKit](https://github.com/sveltejs/kit) and
    [Vite](https://github.com/vitejs/vite)
  - integrated [TypeScript](https://github.com/microsoft/TypeScript)
    with [Svelte](https://github.com/sveltejs/svelte) and
    [svelte-check](https://github.com/sveltejs/language-tools/tree/master/packages/svelte-check)
  - testing with [uvu](https://github.com/lukeed/uvu)
  - formatting with [Prettier](https://github.com/prettier/prettier)
  - linting with [ESLint](https://github.com/eslint/eslint)
    and [`@ryanatkn/eslint-config`](https://github.com/ryanatkn/eslint-config)
  - also has [a task system](https://github.com/ryanatkn/gro/blob/main/src/lib/docs/task.md)
    with a bunch of [builtins](https://github.com/ryanatkn/gro/blob/main/src/lib/docs/tasks.md),
    [codegen](https://github.com/ryanatkn/gro/blob/main/src/lib/docs/gen.md),
    and [other things](https://github.com/ryanatkn/gro/tree/main/src/lib/docs)
- optional [utilities library `@ryanatkn/belt`](https://github.com/ryanatkn/belt)

## usage

This project uses [SvelteKit](https://kit.svelte.dev/) with the static adapter
and [Vite](https://vitejs.dev/),
so the normal commands like `vite dev` work as expected.
It also uses [Gro](https://github.com/ryanatkn/gro)
for tasks like deploying and more.

**⚠️ Important,** this template is designed for **public** open source projects.
Its `package.json` has `"public": true` by default,
which [tells Gro](https://github.com/ryanatkn/gro/blob/main/src/lib/docs/gro_plugin_sveltekit_frontend.md#well_known_package_json)
to publish the `package.json` and a map of its `src/` directory
to `static/.well-known/` during the build.
This can leak sensitive information if you are not careful ⚠️
To disable the feature, edit [package.json](/package.json):

```diff
// package.json
- "public": true, // remove this to disable the public `.well-known` files
+ "private": true, // if you want to disable npm publishing, add this
```

> [Windows will not be suported supported](https://github.com/ryanatkn/fuz_template/issues/4)
> because I chose Bash instead - [WSL](https://docs.microsoft.com/en-us/windows/wsl/about) works

If you're logged into GitHub, click "Use this template" above or clone with
[`degit`](https://github.com/Rich-Harris/degit):

```bash
npx degit ryanatkn/fuz_template cooltoy
cd cooltoy
npm i
# then
vite dev
# or
npm run dev
# or
gro dev # npm i -g @ryanatkn/gro
gro sync # called by `gro dev`, refreshes generated files and calls `svelte-kit sync`
```

> learn more about [SvelteKit](https://github.com/sveltejs/kit),
> [Vite](https://github.com/vitejs/vite), [Gro](https://github.com/ryanatkn/gro),
> and [Fuz](https://github.com/ryanatkn/fuz)

The template includes
[`@sveltejs/adapter-static`](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)
so it can [deploy](https://github.com/ryanatkn/gro/blob/main/src/lib/docs/deploy.md)
with no further configuration.
To learn how to swap it out for another deployment target, see
[the SvelteKit adapter docs](https://kit.svelte.dev/docs#adapters).

To make it your own, change `@ryanatkn/fuz_template` and `template.fuz.dev`
to your project name in the following files:

- [`package.json`](package.json)
- [`svelte.config.js`](svelte.config.js)
- [`src/routes/+layout.svelte`](src/routes/+layout.svelte)
- [`src/routes/+page.svelte`](src/routes/+page.svelte)
- update or delete [`src/static/CNAME`](src/static/CNAME)
  and [.github/FUNDING.yml](.github/FUNDING.yml)

Then run `npm i` to update `package-lock.json`.

Optionally add a [license file](https://choosealicense.com/)
and [`package.json` value](https://spdx.org/licenses/), like `"license": "MIT"`.

## build

```bash
npm run build
# or
gro build
```

See [Gro's build docs](https://github.com/ryanatkn/gro/blob/main/src/lib/docs/build.md) for more.

## test

```bash
npm test
# or
gro test
gro test filepattern1 filepatternB
gro test -- uvu --forwarded_args 'to uvu'
```

See [uvu](https://github.com/lukeed/uvu),
[`src/lib/example.test.ts`](src/lib/example.test.ts),
and [Gro's test docs](https://github.com/ryanatkn/gro/blob/main/src/lib/docs/test.md) for more.

## deploy

[Deploy](https://github.com/ryanatkn/gro/blob/main/src/lib/docs/deploy.md)
(build, commit, and push) to the `deploy` branch, e.g. for GitHub Pages:

```bash
npm i -D @sveltejs/package # enables Gro's library plugin by default
npm run deploy
# or
gro deploy
```

## credits 🐢<sub>🐢</sub><sub><sub>🐢</sub></sub>

[Svelte](https://github.com/sveltejs/svelte) ∙
[SvelteKit](https://github.com/sveltejs/kit) ∙
[Vite](https://github.com/vitejs/vite) ∙
[esbuild](https://github.com/evanw/esbuild) ∙
[uvu](https://github.com/lukeed/uvu) ∙
[TypeScript](https://github.com/microsoft/TypeScript) ∙
[ESLint](https://github.com/eslint/eslint) ∙
[Prettier](https://github.com/prettier/prettier) ∙
[Moss](https://github.com/ryanatkn/moss) ∙
[Fuz](https://github.com/ryanatkn/fuz) ∙
[Gro](https://github.com/ryanatkn/gro) ∙
[@ryanatkn/belt](https://github.com/ryanatkn/belt) ∙
[Zod](https://github.com/colinhacks/zod) ∙
& [more](package.json)

## [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)
