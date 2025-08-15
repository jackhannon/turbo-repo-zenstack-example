

> ##### Disclaimer


Hey there! Welcome to our monorepo powered by Turbo. This guide will help you
quickly set up your environment and get started with development.

<details>
  <summary>We use Turbo to manage our monorepo. Click here if you don't know what that is 🤔</summary>

Turbo is a high-performance build system for JavaScript and TypeScript
monorepos. It speeds up builds and tests by leveraging smart caching and task
scheduling. If you're working with multiple projects in a single repository,
Turbo helps manage dependencies, optimize workflows, and reduce build times.

For more details, check out [Turbo's documentation](https://turbo.build/docs).

</details>

## Quick start

Follow these steps to have your sample NoCode app running in no time:

### What you need first

Ensure you're using the correct `Node` LTS version and `pnpm` version specified
in [package.json](package.json).

<details>
  <summary>If you don't have `pnpm` installed yet, this is one of the ways you have to do it</summary>

```bash
  npm i -g pnpm@<version>
```

</details>

---

### Install dependencies

Dependencies are installed at a monorepo level. That's why you will only see
lockfiles on the root.

```bash
pnpm i
```

Now, before we run the app, it is needed to have a local Supabase instance
configured and running.

Check [database README](packages/database/README.md#running-supabase) to have
that ready.

Once you pass this point, you are already able to run the NoCode app. Refer to
[Getting started with frontend](apps/frontend/README.md#getting-frontend-running)
to have it running.
