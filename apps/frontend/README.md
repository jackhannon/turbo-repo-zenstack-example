# SAMPLE NoCode app with NextJS

## Getting frontend running

### Requirements

Ensure you have the correct following installed:

- Node.js (LTS, v20 may not work with some dependencies)

Ensure you already have Supabase running. Check [Running Supabase](../../packages/database/README.md#running-supabase), if not.

### Adding the Supabase Keys to the Environment Variables

We will need to get the Supabase keys and add them to our local environment variables configuration file `.env.local`. The file does not exist because it's not supposed to be pushed to the repository: please create it and add the environment variables below.

When starting Supabase, we will see a message like [this](../../packages/database/README.md#supabase-info).
Now, we need to copy the `anon key` and `service_role key` values and add
them to the `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=****************************************************
SUPABASE_SERVICE_ROLE_KEY=****************************************************
```

### Running Next.js Server

```bash
pnpm dev
```

---

> **⚠️⚠️⚠️** The content of this README below this line may be outdated. **⚠️⚠️⚠️**

---

### Running the Stripe CLI

If you're testing Stripe, also run the Stripe server (requires Docker running):

```
npm run stripe:listen
```

Then, copy the printed webhook key and add it to your environment files.
This can also be used for running the E2E tests.

The environment variable name is `STRIPE_WEBHOOK_SECRET`.

```
STRIPE_WEBHOOK_SECRET=whsec_***********************
```

#### Signing In for the first time

You should now be able to sign in. To quickly get started, use the following credentials:

```
email = test@makerkit.dev
password = testingpassword
```

#### Email Confirmations

When signing up, Supabase sends an email confirmation to a testing account. You can access the InBucket testing emails [using the following link](http://localhost:54324/monitor), and can follow the links to complete the sign up process.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### After Creating your Supabase Project

Make sure to add the environment variables to the provider you're deploying.

### Running Tests

Before running tests, make sure the environment variables specific to the development database credentials are in your `.env.test` file:

```
SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Retrieve the keys after starting the Supabase server and paste them in the `.env.test` file.

To run end-to-end tests:

1. `pnpm run build`

2. `pnpm run start`

3. in another terminal, `pnpm run e2e`

#### Running E2E Stripe Tests

To run the Stripe tests and enable Stripe in development mode, you need to:

1. Enable the tests using the environment variable `ENABLE_STRIPE_TESTING` in
   `.env.test`
2. Have Docker installed and running in your local machine to run the Stripe
   Emulator
3. Generate a webhook key and set the environment variable
   `STRIPE_WEBHOOK_SECRET` and the other required Stripe environment variables

The first two steps are only required to run the Cypress E2E tests for
Stripe. Generating a webhook key and running the Stripe CLI server is
always required for developing your Stripe functionality locally.

The variables should be added either in `.env.test` or as part of your CI
environment.

NB: The secret keys should not be added to the repository - even
though these are test keys. Instead - please add them to your CI
environment - such as Github Actions.

The test API keys should be added as secrets - while the variable
ENABLE_STRIPE_TESTING should be added as a simple variable.

To generate a webhook key, run the following command:

```
npm run stripe:listen
```

If it worked, it will print the webhook key. Then, paste it into
your environment files as `STRIPE_WEBHOOK_SECRET`.

This key is also needed to run Stripe during development to receive the
Stripe webhooks to your local server.

```
ENABLE_STRIPE_TESTING=true
```

The Stripe tests work only using the Embedded Stripe Checkout.
