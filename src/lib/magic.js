import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth2";
import { FlowExtension } from "@magic-ext/flow";

const createMagic = (key) => {
  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      extensions: [new OAuthExtension(), new FlowExtension({
        // testnet or mainnet to connect different network
        rpcUrl: 'https://rest-testnet.onflow.org',
        network: 'testnet'
      })],
    })
  );
};

export const magic = createMagic("pk_live_C3F8C5D5B5287599");
