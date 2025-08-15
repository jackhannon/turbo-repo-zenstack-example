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

## Generating the client

```bash
# generate the zenstack client
pnpm run zenstack:generate
```
