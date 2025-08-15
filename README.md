Ensure you're using the correct `Node` LTS version and `pnpm` version specified
in [package.json](package.json).

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
