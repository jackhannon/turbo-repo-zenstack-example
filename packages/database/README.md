# SAMPLE database package

Welcome to the database package based on Supabase. This guide will help you
quickly set up your database instance and get started with development.

## Running Supabase

<details>
  <summary>What's that?</summary>

Supabase is an open-source alternative to Firebase. It provides a suite of tools
for authentication, database management, and real-time data syncing—all powered
by PostgreSQL. It’s perfect for building modern, scalable applications.

Wanna learn more? Check out
[Supabase’s documentation](https://supabase.com/docs).

</details>
<br>

<details>
  <summary>If you already first configured Supabase, just start it</summary>

```bash
# ensure you already are on the database package folder
pnpm run start
```

</details>
<br>

IMPORTANT: **you must have Docker running for this step**.\
This setup does not run a remote Supabase project, but a local instance using Docker.
Supabase will start a set of containers locally to mimic real Supabase services.
This is useful for development and testing.

```bash
# ensure you are on the database package folder
cd packages/database

# db:reset will recreate your database, apply the migrations and the seed file.
pnpm run db:reset

pnpx supabase status
```

The last command will output something like the following (with few differences
depending on whether you change something in the Supabase `config.toml`):

<a name="supabase-info"></a>

```
supabase local development setup is running.
         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: <anon jwt>
service_role key: <service role jwt>
   S3 Access Key: <s3 access key>
   S3 Secret Key: <secret key>
       S3 Region: local
```

## Connecting to Supabase Studio

You can connect to the Supabase Studio by going to the following URL:
http://localhost:54323/project/default.

You will use this to have

You can apply the migrations through the following:

```bash
# Reset the LOCAL database and apply migrations
pnpm run db:reset
```

#### Creating a Migration

When you want to save the local changes made in the database, you have to create
a migration with:

```bash
cd packages/database

# Log the diff and make a new migration file
pnpm db:md your_migration_name

# Open the migration file and paste the diff output there
pnpx supabase db diff --schema public --file your_migration_name

# NOTE: Check the file created
```

### Running migrations

To run new migrations in local DB, you need to run:

```bash
# Navigate to the database folder
cd packages/database

# Run any migration pending in local DB
pnpx supabase migration up --local
```

To run migrations in remote DBs (i.e. dev, stg, prod), you **need the DB
password**.

```bash
# Navigate to the database folder
cd packages/database

# Select the project
pnpx supabase link

# List new migrations to make sure they are the correct ones
pnpx supabase db push --dry-run

# Run new migrations
pnpx supabase db push
```

#### Get types

You can generate Supabase types for use in the project (e.g.,
`Tables<'project_goals'>`) as follows

```bash
cd packages/database
pnpm run typegen
```

---

> **⚠️⚠️⚠️** The content of this README below this line may be outdated.
> **⚠️⚠️⚠️**

---

### Configuring Supabase

We need to configure a couple of things in Supabase first

#### Configuring SMTP

The default SMTP is rate limited, so we need to set our own. We can do this
here: https://supabase.com/dashboard/project/_/settings/auth and click "Enable
Custom SMTP"

> WARNING: Do not use the base64 encoded values. Use `apikey` as the username
> and the actual API key as the password

#### Configuring Authentication URLs

Under your "Auth" tab
(https://supabase.com/dashboard/project/_/auth/url-configuration) you need to
configure the following URLs:

- **Site URL:** Your frontend URL (e.g., https://app.sample.io)
- **Sign in redirect URL:** Your frontend URL (e.g.,
  https://app.sample.io/auth/callback)
  $$
