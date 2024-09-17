# Magic Dedicated Wallet GitHub Social Login

Please [click here](https://magic.link/docs/authentication/login/social-logins/social-providers/github) for full implementation instructions

## Quickstart

- Run `pnpm install` to install packages
- Open `/src/lib/magic.js` and insert your Magic publishable API key
  - `export const magic = createMagic("ENTER_YOUR_MAGIC_PUBLISHABLE_API_KEY");`
- Run`pnpm start` (or use your preferred package manager) to launch app locally
- Log in using the `Log in with GitHub` button
- After login you will land on `/dashboard`
- On the `/dashboard` page click the `Send Trx` to send a sample transaction on Flow testnet
  - Confirmation of the transaction send or error will print to the developer console in the browser!
